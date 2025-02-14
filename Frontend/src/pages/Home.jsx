import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { FormColumn, FormRow } from "../components/layoutComponent";
import "../styles/Home.css";

const data = [
  { id: 1, name: "Mehroz", age: 23, veteran: "No" },
  { id: 2, name: "Ali", age: 30, veteran: "Yes" },
  { id: 3, name: "Sara", age: 27, veteran: "No" },
  { id: 4, name: "Ahmed", age: 35, veteran: "Yes" },
  { id: 5, name: "Fatima", age: 22, veteran: "No" },
  { id: 6, name: "Bilal", age: 29, veteran: "Yes" },
  { id: 7, name: "Ayesha", age: 26, veteran: "No" },
  { id: 8, name: "Zain", age: 32, veteran: "Yes" },
  { id: 9, name: "Hassan", age: 28, veteran: "No" },
  { id: 10, name: "Nida", age: 24, veteran: "Yes" },
];

const Home = () => {
  const { control, watch } = useForm({
    defaultValues: { searchTerm: "" },
  });
  const searchTerm = watch("searchTerm").toLowerCase();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.veteran}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </FormRow>
        <FormRow>
          <FormColumn>
            <div className="pagination_container">
              <div
                className="left_arrow"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                style={{ cursor: currentPage > 1 ? "pointer" : "not-allowed" }}
              >
                &lt;
              </div>
              {Array.from({ length: totalPages }, (_, i) => (
                <div
                  key={i + 1}
                  className={`page_${i + 1} ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                  style={{ cursor: "pointer" }}
                >
                  {i + 1}
                </div>
              ))}
              <div
                className="right_arrow"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                style={{ cursor: currentPage < totalPages ? "pointer" : "not-allowed" }}
              >
                &gt;
              </div>
            </div>
          </FormColumn>
        </FormRow>
      </div>
    </div>
  );
};

export default Home;
