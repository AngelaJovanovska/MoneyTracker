import express, { response } from "express";
import { UserCreateRequest } from "../models/request/user/UserCreateRequest.model";
import ds from "../../db";
import { User } from "../../entities/User";
import { UserCreateResponse } from "../models/response/user/UserCreateResponse.model";
import { UserLoginRequest } from "../models/request/user/UserLoginRequest.model";
import * as bcrypt from "bcryptjs";
import { UserNotFoundException } from "../../exceptions";
import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../../config/env-variables";
import { REFRESH_TOKEN_SECRET } from "../../config/env-variables";
import { JWTAccessPayload } from "../../middlewares/types";

const auth_router = express.Router();
const userRepository = ds.getRepository(User);

auth_router.post("/register", async (req, res) => {
    const userCreateModel = new UserCreateRequest(req.body);
    const { error, messages } = await userCreateModel.validate();
    if (error) {
        return res.status(400).json({ msg: messages?.join(",") ?? "" });
    }

    const user = userCreateModel.toUser();
    try {
        await userRepository.save(user);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: "db error" });
    }
    const payload = new UserCreateResponse(user);
    return res.status(201).json(payload);
});

//login

auth_router.post("/login", async (req, res) => {
    const loginUser = new UserLoginRequest(req.body);

    const user = await userRepository.findOne({
        where: { email: loginUser.email },
    });
    if (!user) {
        return res.status(400).json(new UserNotFoundException());
    }

    const isSame = await bcrypt.compare(loginUser.password, user.password); //hash(loginUser.password, 10);

    if (!isSame) {
        return res.status(400).json({
            msg: "email or password not correct//invalid credentials",
        });
    }

    const payload: JWTAccessPayload = { userId: user.id };

    const accessToken = await jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: "1min",
    });
    const refreshToken = await jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: "20min",
    });
    const response = { accessToken, refreshToken };

    return res.status(200).json(response);
});

auth_router.post("/refresh", async (req, res) => {
    const refreshToken = req.body["refreshToken"];
    if (!refreshToken) {
        return res
            .status(401)
            .send("Access Denied. No refresh token provided.");
    }

    try {
        const decoded: JWTAccessPayload = jwt.verify(
            refreshToken,
            REFRESH_TOKEN_SECRET
        ) as JWTAccessPayload;
        const accessToken = jwt.sign(
            { userId: decoded.userId },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1min",
            }
        );
        return res.status(200).json({ accessToken: accessToken });
    } catch (error) {
        return res
            .status(400)
            .send("Invalid refresh token. Please log in again");
    }
});
export { auth_router as auth };
