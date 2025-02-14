import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { FormColumn, FormRow } from '../components/layoutComponent';
import CDropdown from '../components/FormComponents/CDropDown';
import CustomTextInput from '../components/FormComponents/CustomTextInput';
import "../styles/adduser.css";

const AddUser = () => {
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            grandpaID: null,
            children: [{ id: "", name: "", age: "", ventega: "" }], // Default child row
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: "children"
    });

    // Function to add a new row
    const handleAddRow = () => {
        append({ id: "", name: "", age: "", ventega: "" });
    };

    // Function to handle form submission
    const onSubmit = (data) => {
        console.log("Submitted Data:", data);
    };

    return (
        <div className="add_user_page">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Grandpa Dropdown */}
                <FormRow>
                    <FormColumn xl={3} lg={3} md={4} sm={12} xs={12}>
                        <CDropdown
                            control={control}
                            name="grandpaID"
                            required={true}
                            label="Grandpa ID"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Select Grandpa ID"
                            onChange={(e) => setValue("grandpaID", e.value)}
                            options={[{ label: "Grandpa1", value: 1 }, { label: "Grandpa2", value: 2 }]}
                        />
                    </FormColumn>
                </FormRow>

                <div className="form_rows">
                    {/* Render Child Rows */}
                    {fields.map((field, index) => (
                        <ChildRow key={field.id} control={control} index={index} />
                    ))}

                    {/* Add Children Button */}
                    <FormRow>
                        <FormColumn className="flex justify-content-end">
                            <button type="button" className="addbtn btn" onClick={handleAddRow}>
                                Add Children
                            </button>
                        </FormColumn>
                    </FormRow>

                    {/* Submit Button */}
                    <FormRow>
                        <FormColumn xl={2} lg={2} md={4} sm={12} xs={12}>
                            <button type="submit" className="btn">Save</button>
                        </FormColumn>
                    </FormRow>
                </div>
            </form>
        </div>
    );
};

// **Child Row Component**
const ChildRow = ({ control, index }) => {
    return (
        <FormRow>
            <FormColumn xl={2} lg={2} md={4} sm={12} xs={12}>
                <CustomTextInput control={control} name={`children[${index}].id`} required={true} label="ID" placeholder="Enter ID" />
            </FormColumn>
            <FormColumn xl={3} lg={3} md={4} sm={12} xs={12}>
                <CustomTextInput control={control} name={`children[${index}].name`} required={true} label="Name" placeholder="Enter Name" />
            </FormColumn>
            <FormColumn xl={2} lg={2} md={4} sm={12} xs={12}>
                <CustomTextInput control={control} name={`children[${index}].age`} required={true} label="Age" placeholder="Enter Age" />
            </FormColumn>
            <FormColumn xl={3} lg={3} md={4} sm={12} xs={12}>
                <CustomTextInput control={control} name={`children[${index}].ventega`} required={true} label="Ventega" placeholder="Enter Yes/No" />
            </FormColumn>
        </FormRow>
    );
};

export default AddUser;
