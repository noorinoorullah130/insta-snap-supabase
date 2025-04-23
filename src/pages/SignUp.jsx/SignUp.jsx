import React, { useRef, useState } from "react";

import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase.js";

const SignUp = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        image: null,
    });

    const navigate = useNavigate();

    const fileInputRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data } = await supabase.auth.signUp({
            email: userDetails.email,
            password: userDetails.password,
        });

        console.log(data);

        const { error } = await supabase.from("users").insert([
            {
                name: userDetails.name,
                lastName: userDetails.lastName,
                email: userDetails.email,
                image: userDetails.image,
            },
        ]);

        if (error) console.log(error);
        console.log(data);

        setUserDetails({
            name: "",
            lastName: "",
            email: "",
            password: "",
            image: null,
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setUserDetails((prev) => ({ ...prev, image: reader.result }));
            };
        }
    };

    return (
        <div className="sign-up">
            <h1>Welcome to InstaSnap</h1>
            <div className="sign-up-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userDetails.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                    />

                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userDetails.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userDetails.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                    />

                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

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
