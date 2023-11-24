import axios from "axios";
import { useState } from "react";
import { Button, Container, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { TSignInSchema, signInSchema } from "../../lib/types";
export interface SignUpFormState {
    email: string;
    password: string;
}

export default function Login({ login }: { login: (user: any) => void }) {
    const [formData, setFormData] = useState<SignUpFormState>({
        email: "",
        password: "",
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        // reset
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    let navigate = useNavigate();

    const onSubmit = async (data: TSignInSchema) => {
        try {
            const response = await axios.post(
                "http://localhost:8083/auth/login",
                formData
            );

            // console.log("success");
            const token = response.data;
            const accessToken = token?.accessToken;
            const refreshToken = token?.refreshToken;
            console.log(accessToken);
            console.log(refreshToken);

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            login(accessToken);
            navigate("/");
            // console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    // console.log(formData);
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
