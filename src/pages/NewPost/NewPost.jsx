import React, { useRef, useState } from "react";

import "./NewPost.css";
import Header from "../../components/Header/Header";
import Left from "./../../components/Left/Left";

const NewPost = () => {
    return (
        <>
            <Header />
            <Left />
            <div className="new-post">
                <form className="post-form">
                    <h1>Create New Post</h1>
                    <label htmlFor="post-content">Post Content</label>
                    <textarea
                        placeholder="Enter post Content"
                        name="content"
                        id="post-content"
                        style={{ whiteSpace: "pre-wrap" }}
                        rows={5}
                        required
                    ></textarea>

                    <label htmlFor="upload-image">Upload Image</label>
                    <input type="file" name="image" id="upload-image" />

                    <button type="submit">Save</button>
                </form>
            </div>
        </>
    );
};

export default NewPost;
