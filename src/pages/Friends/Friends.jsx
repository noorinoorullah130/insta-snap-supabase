import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Left from "../../components/Left/Left";
import "./Friends.css";
import Friend from "../../components/Friend/Friend";
import Loader from "../../Common/Loader";

const Friends = () => {

    return (
        <>
            <Header />
            <Left />
            <div className="friends">
                <h1>Friends</h1>
                <div className="all-friends">
                    {/* {loggedInUser.friends?.length > 0 ? (
                        <Friend
                            friends={loggedInUser.friends}
                            handleRemoveFriend={handleRemoveFriend}
                        />
                    ) : (
                        <p>No friends yet.</p>
                    )} */}
                </div>
            </div>
        </>
    );
};

export default Friends;
