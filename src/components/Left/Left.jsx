import React, { useContext } from "react";
import "./Left.css";
import ProfilePic from "../../assets/users-images/profile pic.webp";
import HomeIcon from "../../assets/house-solid.svg";
import FriendsIcon from "../../assets/user-group-solid.svg";
import LogoutIcon from "../../assets/right-from-bracket-solid.svg";
import NewPostIcon from "../../assets/new-post.png";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../Common/Loader";
import AppContext from "../../Context";
import { supabase } from "./../../supabase";

const Left = () => {
    const { loggedInUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    return (
        <div className="left">
            <NavLink to={`/dashboard`} className="menus">
                <img src={HomeIcon} />
                <h3>Home</h3>
            </NavLink>

            <NavLink to="/profile" className="menus">
                <img className="profile-pic" src={ProfilePic} />
                <h3>{loggedInUser?.name}</h3>
            </NavLink>

            <NavLink to="/newpost" className="menus">
                <img src={NewPostIcon} />
                <h3>New Post</h3>
            </NavLink>

            <NavLink to="/friends" className="menus">
                <img src={FriendsIcon} />
                <h3>Friends</h3>
            </NavLink>

            <NavLink to="/" onClick={handleLogout} className="menus">
                <img src={LogoutIcon} />
                <h3>Logout</h3>
            </NavLink>
        </div>
    );
};

export default Left;
