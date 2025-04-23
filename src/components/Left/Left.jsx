import React from "react";
import "./Left.css";
import ProfilePic from "../../assets/users-images/profile pic.webp";
import HomeIcon from "../../assets/house-solid.svg";
import FriendsIcon from "../../assets/user-group-solid.svg";
import LogoutIcon from "../../assets/right-from-bracket-solid.svg";
import NewPostIcon from "../../assets/new-post.png";
import { NavLink } from "react-router-dom";
import Loader from "../../Common/Loader";

const Left = () => {
    let user = "Noorullah";

    return (
        <div className="left">
            <NavLink to={`/dashboard/${user.id}`} className="menus">
                <img src={HomeIcon} />
                <h3>Home</h3>
            </NavLink>

            <NavLink to="/profile" className="menus">
                <img className="profile-pic" src={ProfilePic} />
                <h3>{user.name}</h3>
            </NavLink>

            <NavLink to="/newpost" className="menus">
                <img src={NewPostIcon} />
                <h3>New Post</h3>
            </NavLink>

            <NavLink to="/friends" className="menus">
                <img src={FriendsIcon} />
                <h3>Friends</h3>
            </NavLink>

            <NavLink to="/" className="menus">
                <img src={LogoutIcon} />
                <h3>Logout</h3>
            </NavLink>
        </div>
    );
};

export default Left;
