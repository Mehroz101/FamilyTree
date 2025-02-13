import React from "react";
import { useForm } from "react-hook-form";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { FormColumn, FormRow } from "../components/layoutComponent"
const Home = () => {
  const method = useForm({
    defaultValues: {
      searchTerm: ""
    }
  })
  return <>
    <div className="home_page">
      <div className="search_bar">
        <FormRow>
          <FormColumn xl={3} lg={3} md={4} sm={12} xs={12} className="flex justify-content-end w-full">

          <CustomTextInput
            control={method.control}
            name={"searchTerm"}
            placeholder="search..."
          />

          </FormColumn>
        </FormRow>
        <FormRow></FormRow>

      </div>
    </div>
  </>;
};

export default Home;
