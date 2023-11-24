import express from "express";
import { User } from "../../entities/User";
import { UserCreateRequest } from "../models/request/user/UserCreateRequest.model";
import {
    UserResponse,
    usersToUserResponse,
} from "../models/response/user/UserResponse.model";
import { UserCreateResponse } from "../models/response/user/UserCreateResponse.model";
import {
    MalformedRequestParamsException,
    UserNotFoundException,
} from "../../exceptions";
import ds from "../../db";
import { RequestWithUserId } from "src/middlewares/types";

export const userRouter = express.Router();
const userRepository = ds.getRepository(User);

userRouter.get("/users/me", async (req, res) => {
    const id = (req as RequestWithUserId).userId;

    const user = await userRepository.findOneBy({ id });
    if (user === null) {
        return res.status(404).json(new UserNotFoundException());
    }

    const payload = new UserResponse(user);

    return res.json(payload).status(200);
});
userRouter.post("/users", async (req, res) => {
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

userRouter.get("/users", async (req, res) => {
    const users = await userRepository.find();

    const payload = usersToUserResponse(users);

    res.json(payload).status(200);
});

userRouter.get("/users/:id", async (req, res) => {
    const id = parseInt(req.params["id"], 10);
    // const id2 = +req.params['id'];
    // const id3 = new Number(req.params['id'])

    if (Number.isNaN(id)) {
        return res.status(400).json(new MalformedRequestParamsException());
    }

    const user = await userRepository.findOneBy({ id });
    if (user === null) {
        return res.status(404).json(new UserNotFoundException());
    }

    const payload = new UserResponse(user);

    return res.json(payload).status(200);
});
