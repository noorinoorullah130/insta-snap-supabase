import React, { useState } from "react";
import "./Comment.css";
import SendIcon from "../../assets/sent.png";
import ProfilePic from "../../assets/users-images/profile pic.webp";

const Comment = () => {
    return (
        <div className="comment">
            <div className="comment-input">
                <input type="text" placeholder="Write a comment..." />
                <img src={SendIcon} className="sent-icon" alt="Send comment" />
            </div>

            <div className="all-comments">
                {/* {comments.map((comment) => (
                    <div className="single-comment" key={comment.id}>
                        <div className="comment-detail">
                            <img
                                src={comment.authorImage || ProfilePic}
                                alt={comment.author}
                            />
                            <div>
                                <h4>{comment.author}</h4>
                                <p>
                                    {new Date(
                                        comment.timestamp
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <p className="comment-content">- {comment.text}</p>
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default Comment;
