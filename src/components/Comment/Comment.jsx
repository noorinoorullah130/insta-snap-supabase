import React, { useState, useEffect } from "react";
import "./Comment.css";
import { supabase } from "../../supabase";

const Comment = ({ postId, loggedInUser }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from("comments")
            .select("*, users(name, image)")
            .eq("post_id", postId)
            .order("created_at", { ascending: false });

        if (error) {
            console.log("Error fetching comments:", error);
        } else {
            setComments(data);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.from("comments").insert([
            {
                content: comment,
                post_id: postId,
                user_id: loggedInUser.id,
            },
        ]);

        if (error) {
            console.log("Error inserting comment:", error);
        } else {
            setComment("");
            fetchComments();
        }
    };

    return (
        <div className="comment">
            <form className="comment-input" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button type="submit" className="sent-btn">
                    Send
                </button>
            </form>

            <div className="all-comments">
                {comments.map((comment) => (
                    <div className="single-comment" key={comment.id}>
                        <div className="comment-detail">
                            <img
                                src={
                                    comment.users?.image ||
                                    "/default-avatar.png"
                                }
                                className="commenter-avatar"
                            />
                            <div>
                                <h4>{comment.users?.name}</h4>
                                <p>
                                    {new Date(
                                        comment.created_at
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <p className="comment-content">- {comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comment;
