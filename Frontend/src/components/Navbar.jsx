import React, { useState } from "react";
import "../styles/navbar.css"
import ProfileImg from "../assets/profile_img.jpg"
export default function Navbar({ onShow }) {
  const [checked, setChecked] = useState(true);
  return (
    <>
    <div className="navbar">
      <div className="profile_box">
        <img src={ProfileImg} alt="profile Image" />
        <div className="user_name">Iqra</div>
      </div>

    </div>
    </>
  );
  
}
