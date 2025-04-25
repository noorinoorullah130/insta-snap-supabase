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
    const [allPosts, setAllPosts] = useState([]);
    const [following, setFollowing] = useState([]);

    const navigate = useNavigate();

    const fetchLoggedInUser = async () => {
        const { data: loggedUser, error: loggedUserError } =
            await supabase.auth.getSession();

        if (loggedUserError || !loggedUser.session) {
            console.log("No session or error:", loggedUserError);
            navigate("/");
            return;
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
        if (!loggedInUser?.id) return;

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .neq("id", loggedInUser.id);
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
            setLoggedInUserPosts(data);
            console.log(data);
        }
    };

    const fetchAllFriends = async () => {
        const { data, error } = await supabase
            .from("follows")
            .select("following_id, users!following_id(*)")
            .eq("follower_id", loggedInUser.id);

        if (error) {
            console.log(error);
        } else {
            setFollowing(data);
            console.log(data);
        }
    };

    const fetchUserAndFollowingPost = async () => {
        const { data: followingData, error: followError } = await supabase
            .from("follows")
            .select("following_id")
            .eq("follower_id", loggedInUser.id);

        if (followError) {
            console.error("Follow error:", followError);
            return;
        }

        const followingIds = followingData.map((f) => f.following_id);

        const allUserIds = [...followingIds, loggedInUser.id];

        const { data: postsData, error: postsError } = await supabase
            .from("posts")
            .select("*, users(name, image)")
            .in("user_id", allUserIds)
            .order("created_at", { ascending: false });

        if (postsError) {
            console.error("Posts error:", postsError);
        } else {
            console.log("Feed posts:", postsData);
            setAllPosts(postsData);
        }
    };

    useEffect(() => {
        fetchLoggedInUser();
    }, [navigate]);

    useEffect(() => {
        fetchAllUsers();
        fetchLoggedInUserPosts();
        fetchAllFriends();
        fetchUserAndFollowingPost();
    }, [loggedInUser]);

    return (
        <div>
            <AppContext.Provider
                value={{
                    loggedInUser,
                    allUsers,
                    loggedInUserPosts,
                    following,
                    allPosts,
                }}
            >
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
