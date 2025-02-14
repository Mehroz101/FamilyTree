// src/components/CustomSidebar.js
import React from "react";
import "../../styles/CustomSidebar.css"; // Optional CSS for custom styles
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faCalendar, faCoffee, faFile, faHome, faMoneyBillWave, faPager, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { ROUTES } from "../../utils/routes";
const CustomSidebar = ({ visible, onHide }) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    onHide(); // Close the sidebar
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
      <>
     <div className="sidebar">
       <div className="sidebar_header">
         <h3 className="sidebar_logo">Datacenter</h3>
       </div>
       <div className="sidebar_items">
        <Link className="sidebar_item">
          <FontAwesomeIcon icon={
            faHome
          } />
          <span className="item_name">Home</span>
        </Link>
        <Link className="sidebar_item">
          <FontAwesomeIcon icon={
            faCalendar
          } />
          <span className="item_name">Catalog</span>
        </Link>
        <Link className="sidebar_item">
          <FontAwesomeIcon icon={
            faBlog
          } />
          <span className="item_name">Blogs</span>
        </Link>
        <Link className="sidebar_item">
          <FontAwesomeIcon icon={
            faFile      
          } />
          <span className="item_name">Pages</span>
        </Link>
        <Link className="sidebar_item">
          <FontAwesomeIcon icon={
            faMoneyBillWave      
          } />
          <span className="item_name">Payments</span>
        </Link>
        <Link to={ROUTES.HOME} className="sidebar_item" style={{cursor:"pointer"}}>
          <FontAwesomeIcon icon={
            faUser      
          } />
          <span className="item_name" >Users</span>
        </Link>
        <Link to={ROUTES.ADDUSER} className="sidebar_item" style={{cursor:"pointer",paddingLeft:"10px"}}>
          <FontAwesomeIcon icon={
            faUserPlus      
          } />
          <span className="item_name">Add User</span>
        </Link>

       </div>
      
     </div>
      </>
  );
};

export default CustomSidebar;
