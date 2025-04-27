import React, { useState, useEffect, useContext } from "react";
import "./Post.css";
import LikeIcon from "../../assets/thumbs-up-solid.svg";
import CommentIcon from "../../assets/comment-solid.svg";
import ShareIcon from "../../assets/share-solid.svg";
import Loader from "../../Common/Loader";
import Comment from "./../Comment/Comment";
import AppContext from "../../Context";

const Post = ({ posts, loggedInUserPosts }) => {
    const [visibleComments, setVisibleComments] = useState({});

    const { loggedInUser } = useContext(AppContext);

    const postList = posts || loggedInUserPosts;

    if (!loggedInUser || !postList) {
        return <Loader />;
    }

    const handleToggleComments = (id) => {
        setVisibleComments((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    return postList.map((post) => (
        <div className="post" key={post.id}>
            <div className="post-header">
                <div className="post-header-left">
                    <img
                        src={post.users?.image || loggedInUser.image}
                        alt="post profile"
                        className="post-profile-img"
                    />
                    <div className="post-details">
                        <h2 className="post-author">
                            {post.users?.name || loggedInUser.name}
                        </h2>
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
                    <div className="buttons">
                        <button className={"like-button"}>Like</button>
                        <button
                            className="comment-button"
                            onClick={() => handleToggleComments(post.id)}
                        >
                            Comment
                        </button>
                        <button className="share-button">Share</button>
                    </div>
                </div>

                {visibleComments[post.id] && (
                    <Comment postId={post.id} loggedInUser={loggedInUser.id} />
                )}
            </div>
        </div>
    ));
};

export default Post;
