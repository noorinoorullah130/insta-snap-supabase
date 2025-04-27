import React, { useContext, useEffect } from "react";
import "./Friend.css";
import { supabase } from "../../supabase";
import AppContext from "../../Context";

const Friend = ({ friends }) => {
    const { loggedInUser, fetchUserAndFollowingPost, setFollowing } =
        useContext(AppContext);

    const handleRemoveFriend = async (friendId) => {
        const { data, error } = await supabase.from("follows").delete().match({
            follower_id: loggedInUser.id,
            following_id: friendId,
        });

        if (error) {
            console.log(error);
        } else {
            console.log("Friend removed:", data);

            setFollowing((prevFollowers) =>
                prevFollowers.filter((fr) => fr.users.id !== friendId)
            );

            fetchUserAndFollowingPost();
        }
    };

    return (
        <div className="friend">
            {friends.map((fr, i) => (
                <div className="friend-container" key={i}>
                    <img src={fr.users.image} alt="" />
                    <div className="friend-details">
                        <h2>{fr.users.name}</h2>
                        <button onClick={() => handleRemoveFriend(fr.users.id)}>
                            Remove Friend
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Friend;
