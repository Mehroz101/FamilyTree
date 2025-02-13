import React from "react";
import { useForm } from "react-hook-form";
import CustomTextInput from "../components/FormComponents/CustomTextInput";

const Home = () => {
  const method = useForm({
    defaultValues:{
      searchTerm:""
    }
  })
  return <>
  <div className="home_page">
    <div className="search_bar">
  <CustomTextInput
  control={method.control}
  name={"searchTerm"}
  />
    </div>
  </div>
  </>;
};

export default Home;
