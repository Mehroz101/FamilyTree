import React, { useState } from "react";
import "../styles/navbar.css"
import ProfileImg from "../assets/profile_img.jpg"
export default function Navbar({ pagename="All Users" }) {
  return (
    <>
    <div className="navbar">
      <div className="page_name">
        <h3>{pagename}</h3>
      </div>
      <div className="profile_box">
        <img src={ProfileImg} alt="profile Image" />
        <div className="user_name">Iqra</div>
      </div>

    </div>
    </>
  );
  
}
