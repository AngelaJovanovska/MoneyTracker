import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/env-variables";
import { JWTAccessPayload, RequestWithUserId } from "./types";

export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(403);

    try {
        const payload: JWTAccessPayload = (await jwt.verify(
            token,
            ACCESS_TOKEN_SECRET
        )) as JWTAccessPayload;

        (req as RequestWithUserId).userId = payload.userId;
        return await next();
    } catch (err) {
        return res
            .status(401)
            .json({ msg: "authenticate error in middlewares.index.ts" });
    }
}
