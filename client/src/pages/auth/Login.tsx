import axios from "axios";
import { useState } from "react";
import { Button, Container, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignInSchema, signInSchema } from "../../lib/types";

// export interface SignInFormState {
//     email: string;
//     password: string;
// }

export default function Login({ login }: { login: (user: any) => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, touchedFields },
        // reset
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    // };
    // const submitData:SubmitHandler<SignInFormState> = (data) => {
    //     // console.log("itworked,", data);
    //     // setFormData((prevData) => ({ ...prevData }));
    //     console.log(data);
    // };
    let navigate = useNavigate();

    const onSubmit = async (data: TSignInSchema) => {
        console.log("data ", data);
        try {
            const response = await axios.post(
                "http://localhost:8083/auth/login",
                data
            );

            // console.log("success");
            const token = response.data;
            const accessToken = token?.accessToken;
            const refreshToken = token?.refreshToken;

            console.log("access ", accessToken);
            console.log("refresh ", refreshToken);
            console.log(touchedFields);

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            login(accessToken);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <Typography style={{ marginTop: 13, marginBottom: 2 }}>
                LOGIN HERE
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    {...register("email", { required: "Email is required" })}
                    autoComplete="email"
                    autoFocus
                />
                {errors.email && (
                    <p
                        style={{ color: "#FF0000" }}
                    >{`${errors.email.message}`}</p>
                )}
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="password"
                    autoFocus
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                >
                    LOG IN
                </Button>
                <Link href="http://localhost:3000/register" underline="hover">
                    Register if you already don't have an account
                </Link>
            </form>
        </Container>
    );
}
