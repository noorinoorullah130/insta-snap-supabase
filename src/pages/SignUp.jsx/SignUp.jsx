import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="sign-up">
            <h1>Welcome to InstaSnap</h1>
            <div className="sign-up-container">
                <h1>Sign Up</h1>
                <form>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        required
                    />

                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Enter your Last Name"
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        required
                    />

                    <label htmlFor="image">Upload Image:</label>
                    <input type="file" id="image" />

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
