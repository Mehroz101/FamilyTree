import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { FormColumn, FormRow } from "../components/layoutComponent";
import "../styles/Home.css";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/serviceApi";

const Home = () => {
  const { control, watch } = useForm({ defaultValues: { searchTerm: "" } });
  const searchTerm = watch("searchTerm").toLowerCase();
  const [userData, setUserData] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  // Fetch user data
  const { data: userdata } = useQuery({
    queryKey: ["userData"],
    queryFn: getAllUsers,
  });

  // Load expanded state from localStorage
  useEffect(() => {
    const savedExpandedRows = localStorage.getItem("expandedRows");
    if (savedExpandedRows) {
      setExpandedRows(JSON.parse(savedExpandedRows));
    }
  }, []);

  useEffect(() => {
    if (userdata) {
          console.log("Fetched Data:", userdata.data); // Debugging output

      setUserData(userdata.data);
    }
  }, [userdata]);

  // Toggle row expansion and save state
  const toggleRow = (id) => {
    setExpandedRows((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      localStorage.setItem("expandedRows", JSON.stringify(newState));
      return newState;
    });
  };

  // Render rows with expandable functionality
  const renderRows = (items, level = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <tr>
          <td>
            {item?.children && item.children.length > 0 && (
              <span className="expand_icon" onClick={() => toggleRow(item.id)}>
                {expandedRows[item.id] ? "▼" : "▶"}
              </span>
            )}
            <span style={{ marginLeft: `${level * 20}px` }}>{item.id}</span>
          </td>
          <td>{item.name}</td>
          <td>{item.age}</td>
          <td>{item.veteran}</td>
        </tr>
        {expandedRows[item.id] && renderRows(item.children, level + 1)}
      </React.Fragment>
    ));
  };

  const filteredData = userData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="home_page">
      <div className="search_bar">
        <FormRow>
          <FormColumn className="flex justify-content-end w-full">
            <CustomTextInput control={control} name="searchTerm" placeholder="Search..." />
          </FormColumn>
        </FormRow>
        <FormRow>
          <div className="table_container">
            <table className="user_table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Veteran</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  renderRows(filteredData)
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </FormRow>
      </div>
    </div>
  );
};

export default Home;
