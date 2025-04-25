import React, { useContext, useState } from "react";
import Header from "../../components/Header/Header";
import Left from "../../components/Left/Left";
import "./Friends.css";
import Friend from "../../components/Friend/Friend";
import Loader from "../../Common/Loader";
import AppContext from "../../Context";

const Friends = () => {
    const { following } = useContext(AppContext);

    return (
        <>
            <Header />
            <Left />
            <div className="friends">
                <h1>Friends</h1>
                <div className="all-friends">
                    {following?.length > 0 ? (
                        <Friend friends={following} />
                    ) : (
                        <p>No friends yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Friends;
