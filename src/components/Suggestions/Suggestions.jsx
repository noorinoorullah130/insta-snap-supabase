import React, { useState } from "react";

import "./Suggestions.css";
import Loader from "../../Common/Loader";

const Suggestions = () => {

    return (
        <div className="suggestions">
            <h1>Suggestions</h1>
            {/* {allSuggestedUsers.map((user) => (
                <div className="suggest" key={user.id}>
                    <img src={user.image} alt="" />
                    <div className="suggest-details">
                        <h2>{user.name}</h2>
                        <button onClick={() => handleAddFriend(user)}>
                            Add Friend
                        </button>
                    </div>
                </div>
            ))} */}
        </div>
    );
};

export default Suggestions;
