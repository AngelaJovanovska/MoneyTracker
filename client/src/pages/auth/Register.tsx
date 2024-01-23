import axios from "axios";
import { useState } from "react";
import { Button, Container, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "../../lib/types";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });
    let navigate = useNavigate();
    const onSubmit = async (data: TSignUpSchema) => {
        try {
            const response = await axios.post(
                "http://localhost:8083/auth/register",
                data
            );

            console.log("success");

            console.log(response.data);
            return navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };
    // console.log(formData);
    return (
        <Container component="main" maxWidth="xs">
            <Typography style={{ marginTop: 13, marginBottom: 2 }}>
                REGISTER HERE
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
                    id="username"
                    label="Username"
                    {...register("username", {
                        required: "Username is required",
                    })}
                    autoComplete="username"
                    autoFocus
                />
                {errors.username && (
                    <p
                        style={{ color: "#FF0000" }}
                    >{`${errors.username.message}`}</p>
                )}
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="first_name"
                    label="First name"
                    {...register("first_name", {
                        required: "First name is required",
                    })}
                    autoComplete="First name"
                    autoFocus
                />
                {errors.first_name && (
                    <p
                        style={{ color: "#FF0000" }}
                    >{`${errors.first_name.message}`}</p>
                )}
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="lastName"
                    label="Last name"
                    {...register("last_name", {
                        required: "Last name is required",
                    })}
                    autoComplete="last_name"
                    autoFocus
                />
                {errors.last_name && (
                    <p
                        style={{ color: "#FF0000" }}
                    >{`${errors.last_name.message}`}</p>
                )}
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 5,
                            message: "Password must be at least 5 characters",
                        },
                    })}
                    autoComplete="password"
                    autoFocus
                />
                {errors.password && (
                    <p
                        style={{ color: "#FF0000" }}
                    >{`${errors.password.message}`}</p>
                )}
                <Button type="submit" variant="contained">
                    Sign Up
                </Button>
                <Link href="http://localhost:3000/login" underline="hover">
                    Login if you already have an account
                </Link>
            </form>
        </Container>
    );
}
