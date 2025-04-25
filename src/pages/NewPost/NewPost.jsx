import React, { useContext, useRef, useState } from "react";

import "./NewPost.css";
import Header from "../../components/Header/Header";
import Left from "./../../components/Left/Left";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { supabase } from "../../supabase";
import AppContext from "../../Context";

const schema = z.object({
    content: z.string().min(5, "Post content should be at least 5 characters"),
    image: z.any().optional(),
});

const NewPost = () => {
    const fileInputRef = useRef();

    const { loggedInUser } = useContext(AppContext);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        const { content, image } = data;

        const { data: postData, error } = await supabase
            .from("posts")
            .insert([
                { content: content, image: image, user_id: loggedInUser.id },
            ]);

        if (error) {
            console.log(error);
        } else {
            console.log(postData);
            toast.success("New post created successfully!");
            reset();
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setValue("image", reader.result);
            };
        }
    };

    return (
        <>
            <Header />
            <Left />
            <div className="new-post">
                <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1>Create New Post</h1>
                    <div className="input-group">
                        <label htmlFor="post-content">Post Content</label>
                        <textarea
                            id="content"
                            placeholder="Enter post Content"
                            style={{ whiteSpace: "pre-wrap" }}
                            rows={5}
                            {...register("content")}
                        ></textarea>
                        {errors.content && (
                            <p className="error">{errors.content.message}</p>
                        )}
                    </div>

                    <div className="input-group">
                        <label htmlFor="upload-image">Upload Image</label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                    </div>

                    <button type="submit">Save</button>
                </form>
            </div>
        </>
    );
};

export default NewPost;
