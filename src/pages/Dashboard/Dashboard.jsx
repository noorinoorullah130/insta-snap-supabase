import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Dashboard.css";
import Header from "../../components/Header/Header";
import Left from "../../components/Left/Left";
import Post from "../../components/Post/Post";
import Suggestions from "../../components/Suggestions/Suggestions";
import Loader from "../../Common/Loader";

const Dashboard = () => {

    return (
        <div className="dashboard">
            <Header />
            <Left />
            <div className="main-content">
                <div className="all-posts">
                    {/* {allPosts.length > 0 ? (
                        <Post allPosts={allPosts} />
                    ) : (
                        <p>
                            No posts available. Please add new posts or add new
                            friend.
                        </p>
                    )} */}
                </div>

                <div className="suggestions-container">
                    <Suggestions />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
