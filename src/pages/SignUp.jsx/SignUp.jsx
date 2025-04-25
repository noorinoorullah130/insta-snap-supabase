import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "../../supabase.js";
import "./SignUp.css";
import defaultProfilePicture from "../../assets/users-images/profile pic.webp";
import { toast } from "react-toastify";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    image: z.any().optional(),
});

const SignUp = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const navigate = useNavigate();
    const fileInputRef = useRef();

    const onSubmit = async (data) => {
        const { email, password, name, lastName, image } = data;

        const { data: signUpData, error: signUpError } =
            await supabase.auth.signUp({
                email,
                password,
            });

        if (signUpError) {
            console.log(signUpError);
            return;
        }

        const { error: insertError } = await supabase.from("users").insert([
            {
                name,
                lastName,
                email,
                image: image || defaultProfilePicture,
            },
        ]);

        if (insertError) {
            console.log(insertError);
            return;
        }

        toast.success("User saved successfully!");

        reset();
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setValue("image", reader.result);
            };
        }
    };

    return (
        <div className="sign-up">
            <h1>Welcome to InstaSnap</h1>
            <div className="sign-up-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            {...register("name")}
                            placeholder="Enter your name"
                        />
                        {errors.name && (
                            <p className="error">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="input-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            id="lastName"
                            {...register("lastName")}
                            placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                            <p className="error">{errors.lastName.message}</p>
                        )}
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="error">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password")}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="error">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="input-group">
                        <label htmlFor="image">Upload Image:</label>
                        <input
                            type="file"
                            id="image"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                    </div>

                    <button type="submit">Sign Up</button>
                </form>
                <p onClick={() => navigate("/")}>
                    Already have an account?{" "}
                    <strong className="sign-in-msg">Sign In</strong>
                </p>
            </div>
            <p className="footer">
                © {new Date().getFullYear()}, &hearts; made by{" "}
                <strong>Noorullah Noori</strong>.
            </p>
        </div>
    );
};

export default SignUp;
