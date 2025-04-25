import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Dashboard.css";
import Header from "../../components/Header/Header";
import Left from "../../components/Left/Left";
import Post from "../../components/Post/Post";
import Suggestions from "../../components/Suggestions/Suggestions";
import Loader from "../../Common/Loader";
import AppContext from "../../Context";

const Dashboard = () => {
    const { loggedInUserPosts } = useContext(AppContext);

    if (!loggedInUserPosts) {
        return <Loader />;
    }

    return (
        <div className="dashboard">
            <Header />
            <Left />
            <div className="main-content">
                <div className="all-posts">
                    {loggedInUserPosts.length > 0 ? (
                        <Post loggedInUserPosts={loggedInUserPosts} />
                    ) : (
                        <p>
                            No posts available. Please add new posts or add new
                            friend.
                        </p>
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
