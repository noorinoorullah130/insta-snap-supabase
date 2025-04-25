import React from "react";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabase";
import { toast } from "react-toastify";

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignIn = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        const { email, password } = data;

        const { data: authData, error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        if (error) {
            toast.error("Email or password is invalid!");
            console.log(error);
            return;
        }

        const { data: userTable, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (userError || !userTable) {
            toast.error("User not found in the users table.");
            return;
        }

        toast.success("Login successful!");
        navigate("/dashboard");
    };

    return (
        <div className="sign-in">
            <h1>Welcome to InstaSnap</h1>
            <div className="sign-in-container">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="error">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="error">{errors.password.message}</p>
                        )}
                    </div>

                    <button type="submit">Login</button>
                </form>
                <p onClick={() => navigate("/signup")}>
                    Don’t have an account?{" "}
                    <strong className="sign-in-msg">Sign Up</strong>
                </p>
            </div>
            <p className="footer">
                © {new Date().getFullYear()}, &hearts; made by{" "}
                <strong>Noorullah Noori</strong>.
            </p>
        </div>
    );
};

export default SignIn;
