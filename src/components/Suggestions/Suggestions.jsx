import React, { useContext, useState } from "react";

import "./Suggestions.css";
import Loader from "../../Common/Loader";
import AppContext from "../../Context";
import { supabase } from "../../supabase";
import { toast } from "react-toastify";

const Suggestions = () => {
    const { loggedInUser, allUsers, fetchAllUsers, fetchUserAndFollowingPost } =
        useContext(AppContext);

    const handleAddFriend = async (id) => {
        const { data, error } = await supabase
            .from("follows")
            .insert([{ follower_id: loggedInUser.id, following_id: id }]);

        if (error) {
            console.log(error);
        } else {
            console.log(data);
            toast.success("Successfully following user!");
            fetchAllUsers();
            fetchUserAndFollowingPost();
        }

        console.log(id);
    };

    return (
        <div className="suggestions">
            <h1>Suggestions</h1>
            {allUsers.map((user) => (
                <div className="suggest" key={user.id}>
                    <img src={user.image} alt="" />
                    <div className="suggest-details">
                        <h2>
                            {user.name.length > 15
                                ? user.name.slice(0, 10) + "..."
                                : user.name}
                        </h2>
                        <button onClick={() => handleAddFriend(user.id)}>
                            Add Friend
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Suggestions;
