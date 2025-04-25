import React from "react";
import "./Friend.css";

const Friend = ({ friends }) => {
    return (
        <div className="friend">
            {friends.map((fr, i) => (
                <div className="friend-container" key={i}>
                    <img src={fr.users.image} alt="" />
                    <div className="friend-details">
                        <h2>{fr.users.name}</h2>
                        <button>Remove Friend</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Friend;
