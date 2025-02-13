// src/components/CustomSidebar.js
import React from "react";
import "../../styles/CustomSidebar.css"; // Optional CSS for custom styles
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faCalendar, faCoffee, faFile, faHome, faMoneyBillWave, faPager, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
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
        <div className="sidebar_item">
          <FontAwesomeIcon icon={
            faHome
          } />
          <span className="item_name">Home</span>
        </div>
        <div className="sidebar_item">
          <FontAwesomeIcon icon={
            faCalendar
          } />
          <span className="item_name">Catalog</span>
        </div>
        <div className="sidebar_item">
          <FontAwesomeIcon icon={
            faBlog
          } />
          <span className="item_name">Blogs</span>
        </div>
        <div className="sidebar_item">
          <FontAwesomeIcon icon={
            faFile      
          } />
          <span className="item_name">Pages</span>
        </div>
        <div className="sidebar_item">
          <FontAwesomeIcon icon={
            faMoneyBillWave      
          } />
          <span className="item_name">Payments</span>
        </div>
        <div className="sidebar_item">
          <FontAwesomeIcon icon={
            faUser      
          } />
          <span className="item_name">Users</span>
        </div>
        <div className="sidebar_item">
          <FontAwesomeIcon icon={
            faUserPlus      
          } />
          <span className="item_name">Add User</span>
        </div>

       </div>
      
     </div>
      </>
  );
};

export default CustomSidebar;
