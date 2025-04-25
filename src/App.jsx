import React, { useState, useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/SignUp.jsx/SignUp";
import Profile from "./pages/Profile/Profile";
import NewPost from "./pages/NewPost/NewPost";
import Friends from "./pages/Friends/Friends";
import { ToastContainer } from "react-toastify";
import { supabase } from "./supabase";
import AppContext from "./Context";

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState();
    const [allUsers, setAllUsers] = useState([]);
    const [loggedInUserPosts, setLoggedInUserPosts] = useState([]);

    const navigate = useNavigate();

    const fetchLoggedInUser = async () => {
        const { data: loggedUser, error: loggedUserError } =
            await supabase.auth.getSession();
        if (loggedUserError) {
            console.log(loggedUserError);
        } else {
            console.log(loggedUser);
        }

        const { data: user, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("email", loggedUser.session.user.email)
            .single();

        if (userError) {
            console.log(userError);
        } else {
            setLoggedInUser(user);
            console.log(user);
        }
    };

    const fetchAllUsers = async () => {
        const { data, error } = await supabase.from("users").select("*");
        if (error) console.log(error);
        else {
            setAllUsers(data);
            console.log(data);
        }
    };

    const fetchLoggedInUserPosts = async () => {
        if (!loggedInUser?.id) return;

        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("user_id", loggedInUser.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.log(error);
        } else {
            console.log(data);
            setLoggedInUserPosts(data);
        }
    };

    useEffect(() => {
        fetchLoggedInUser();
        fetchAllUsers();
    }, [navigate]);

    useEffect(() => {
        fetchLoggedInUserPosts();
    }, [loggedInUser]);

    return (
        <div>
            <AppContext.Provider
                value={{ loggedInUser, allUsers, loggedInUserPosts }}
            >
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/profile"
                        element={
                            <Profile loggedInUserPosts={loggedInUserPosts} />
                        }
                    />
                    <Route path="/newpost" element={<NewPost />} />
                    <Route path="/friends" element={<Friends />} />
                </Routes>
            </AppContext.Provider>
            <ToastContainer />
        </div>
    );
};

export default App;
