import React, { useState } from "react";
import { Navbar } from "../utils/LazyLoadComponent";
import { Outlet, useLocation } from "react-router-dom";
import CustomSidebar from "../components/Sidebar/SideNavbar";
const Layout = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  let pagename = location.pathname.split("/").pop(); 
  if(location.pathname == "/"){
    pagename = "All Users"
  }
  else if(location.pathname == "/adduser"){
    pagename = "Add User"
  }
  else{
    pagename = "All Users"
  }
  return (
    <>
    <div className="root_layout">

      <div className="sidebar_components">
        <CustomSidebar visible={visible} onHide={() =>{
          setVisible(false)}} />
      </div>
      <div className="right_components">
        <Navbar visible={visible} pagename={pagename} onShow={() => {
          setVisible(true)}} />
        <div className="p-5 outlet_component">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
};

export default Layout;
