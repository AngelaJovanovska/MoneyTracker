import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z.object({
    email: z.string().email(),
    username: z.string().min(8),
    first_name: z.string().min(8),
    last_name: z.string().min(8),
    password: z.string().trim().min(8),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export type TSignInSchema = z.infer<typeof signInSchema>;
