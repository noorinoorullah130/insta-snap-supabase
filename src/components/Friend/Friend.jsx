import React from "react";
import "./Friend.css";

const Friend = () => {
    return (
        <div className="friend">
            {/* {friends.map((fr, i) => (
                <div className="friend-container" key={i}>
                    <img src={fr.image} alt="" />
                    <div className="friend-details">
                        <h2>{fr.name}</h2>
                        <button onClick={() => handleRemoveFriend(fr)}>
                            Remove Friend
                        </button>
                    </div>
                </div>
            ))} */}
        </div>
    );
};

export default Friend;
