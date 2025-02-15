import React, { useState } from "react";
import "../styles/navbar.css"
import ProfileImg from "../assets/profile_img.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";
export default function Navbar({ pagename="All Users" , onShow, visible }) {
  return (
    <>
    <div className="navbar">
      <div className="icon" onClick={onShow}><FontAwesomeIcon icon={faBars} /></div>
      <div className="page_name">
        <h3>{pagename}</h3>
      </div>
      <div className="profile_box">
        <img src={ProfileImg} alt="profile Image" />
        <div className="user_name">Admin</div>
      </div>

    </div>
    </>
  );
  
}
