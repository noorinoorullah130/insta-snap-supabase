import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import InstagramIcon from "../../assets/instagram-brands.svg";
import AppContext from "../../Context";

const Header = () => {
    const { loggedInUser } = useContext(AppContext);

    return (
        <header className="header">
            <h1>
                <img src={InstagramIcon} /> InstaSnap
            </h1>

            <input type="text" placeholder="Search anything..." />

            <div className="profile-picture">
                <h3>
                    {loggedInUser?.name} {loggedInUser?.lastName}
                </h3>
                <img src={loggedInUser?.image} alt="" />
            </div>
        </header>
    );
};

export default Header;
