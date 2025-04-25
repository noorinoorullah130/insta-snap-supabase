import React, { useState, useEffect } from "react";

import { data, Route, Routes, useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    const fetchLoggedInUser = async () => {
        const { data: loggedUser, error: loggedUserError } =
            await supabase.auth.getSession();
        if (loggedUserError) {
            console.log(loggedUserError);
        } else {
            console.log(loggedUser);
            console.log(loggedUser.session.user);
            console.log(loggedUser.session.user.email);
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

    useEffect(() => {
        fetchLoggedInUser();
        fetchAllUsers();
    }, [navigate]);

    return (
        <div>
            <AppContext.Provider value={{ loggedInUser, allUsers }}>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/newpost" element={<NewPost />} />
                    <Route path="/friends" element={<Friends />} />
                </Routes>
            </AppContext.Provider>
            <ToastContainer />
        </div>
    );
};

export default App;
