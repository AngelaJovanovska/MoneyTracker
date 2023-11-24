import { Request } from "express";

export interface JWTAccessPayload {
    userId: number;
}
export interface RequestWithUserId<T = {}> extends Request<T> {
    userId: number;
}
