import React, { useState, useEffect, useContext } from "react";
import "./Post.css";
import LikeIcon from "../../assets/thumbs-up-solid.svg";
import CommentIcon from "../../assets/comment-solid.svg";
import ShareIcon from "../../assets/share-solid.svg";
import Loader from "../../Common/Loader";
import Comment from "./../Comment/Comment";
import AppContext from "../../Context";

const Post = ({ loggedInUserPosts }) => {
    const { loggedInUser } = useContext(AppContext);

    console.log(loggedInUserPosts);

    if (!loggedInUser || !loggedInUserPosts) {
        return <Loader />;
    }

    return loggedInUserPosts.map((post) => (
        <div className="post" key={post.id}>
            <div className="post-header">
                <div className="post-header-left">
                    <img
                        src={loggedInUser.image}
                        alt="post profile picture"
                        className="post-profile-img"
                    />
                    <div className="post-details">
                        <h2 className="post-author">{loggedInUser.name}</h2>
                        <p className="post-time">
                            {new Date(post.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>
                <h1 className="post-options">...</h1>
            </div>
            <div className="post-body">
                <div className="post-content">
                    <div
                        style={{ whiteSpace: "pre-wrap" }}
                        className="post-text"
                    >
                        {post.content}
                    </div>
                    {post.image && (
                        <img
                            src={post.image}
                            alt="Post content"
                            className="post-image"
                        />
                    )}
                </div>

                <div className="post-actions">
                    <button
                        className={`like-button ${post.isLiked ? "liked" : ""}`}
                    >
                        Like{" "}
                        <span className="action-count">
                            ({post.likes}){" "}
                            <img
                                src={LikeIcon}
                                alt="Likes"
                                className="action-icon"
                            />
                        </span>
                    </button>
                    <button className="comment-button">
                        Comment{" "}
                        <span className="action-count">
                            ({post.comments?.length || 0}){" "}
                            <img
                                src={CommentIcon}
                                alt="Comments"
                                className="action-icon"
                            />
                        </span>
                    </button>
                    <button className="share-button">
                        Share{" "}
                        <span className="action-count">
                            (0){" "}
                            <img
                                src={ShareIcon}
                                alt="Share"
                                className="action-icon"
                            />
                        </span>
                    </button>
                </div>
                {/* {activeCommentPostId === post.id && (
                    <Comment
                        comments={post.comments || []}
                        onAddComment={(comment) =>
                            handleAddComment(post.id, comment)
                        }
                    />
                )} */}
            </div>
        </div>
    ));
};

export default Post;
