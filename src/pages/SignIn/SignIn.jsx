import React, { useState } from "react";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();

    return (
        <div className="sign-in">
            <h1>Welcome to InstaSnap</h1>
            <div className="sign-in-container">
                <h1>Sign In</h1>
                <form>
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

                    {/* {error && (
                        <p className="sign-in-error">
                            Email or Password is invalid!
                        </p>
                    )} */}

                    <button type="submit">Login</button>
                </form>
                <p onClick={() => navigate("/signup")}>
                    Already have an account?{" "}
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
