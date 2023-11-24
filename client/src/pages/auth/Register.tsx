import axios from "axios";
import { useState } from "react";
import { Button, Container, Link, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "../../lib/types";
import { red } from "@mui/material/colors";
export interface SignUpFormState {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}

export default function Register() {
    const [formData, setFormData] = useState<SignUpFormState>({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmit = async (data: TSignUpSchema) => {
        try {
            const response = await axios.post(
                "http://localhost:8083/auth/register",
                formData
            );

            console.log("success");
            console.log(response.data);
            // return navigate("/");
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
                    id="username"
                    label="Username"
                    {...register("username", {
                        required: "Username is required",
                    })}
                    autoComplete="username"
                    autoFocus
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
