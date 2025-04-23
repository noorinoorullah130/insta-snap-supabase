import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Loader from "../../Common/Loader";
import "./Profile.css";
import Left from "../../components/Left/Left";
import Post from "../../components/Post/Post";

const Profile = () => {
    return (
        <>
            <Header />
            <Left />
            <div className="profile">
                <div className="details-container">
                    <div className="profile-details">
                        {/* <img
                            src={user?.image}
                            alt="profile"
                            className="profile-img"
                        /> */}
                        <div className="user-info">
                            <h1 className="user-name">Noorullah Noori</h1>
                            <h2 className="user-email">
                                noorullah.noori@gmail.com
                            </h2>
                        </div>
                    </div>
                    <div className="all-posts">
                        <Post />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
