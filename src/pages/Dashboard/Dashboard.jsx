import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";
import Header from "../../components/Header/Header";
import Left from "../../components/Left/Left";
import Post from "../../components/Post/Post";
import Suggestions from "../../components/Suggestions/Suggestions";
import Loader from "../../Common/Loader";
import AppContext from "../../Context";

const Dashboard = () => {
    const { allPosts, loggedInUser } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser) {
            navigate("/"); // redirect to login if not logged in
        }
    }, [loggedInUser, navigate]);

    return (
        <div className="dashboard">
            <Header />
            <Left />
            <div className="main-content">
                <div className="all-posts">
                    {allPosts?.length > 0 ? (
                        <Post posts={allPosts} />
                    ) : (
                        <>
                            <Loader />
                            <p className="no-posts-available">
                                Maybe no posts available. Please create new
                                posts or follow someone to see posts.
                            </p>
                        </>
                    )}
                </div>
                <div className="suggestions-container">
                    <Suggestions />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
