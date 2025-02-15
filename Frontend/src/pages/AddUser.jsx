import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { FormColumn, FormRow } from '../components/layoutComponent';
import CDropdown from '../components/FormComponents/CDropDown';
import CustomTextInput from '../components/FormComponents/CustomTextInput';
import "../styles/adduser.css";
import { useMutation, useQuery } from '@tanstack/react-query';
import { AddNewUser, getUserDropdown } from '../services/serviceApi';
import { notify } from '../utils/notification';
import { useNavigate } from 'react-router-dom';
const AddUserPage = () => {
    const [grandpas, setGrandpas] = useState([]);
    const { control, handleSubmit, setValue, reset } = useForm({
        defaultValues: {
            grandpaId: null,
            children: [{ id: "", name: "", age: "", ventega: "" }],
        }
    });
    const navigate = useNavigate();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "children"
    });

    const handleAddRow = () => {
        append({ id: "", name: "", age: "", ventega: "" });
    };

    const addNewUserMutation = useMutation({
        mutationFn: AddNewUser,
        onSuccess: (data) => {
            if (data.success) {
                notify("success", data.message);
                reset();
                navigate("/");
            } else {
                notify("error", data.message);
            }
        }
    });

    const onSubmit = (data) => {
        addNewUserMutation.mutate(data);
    };

    const { data } = useQuery({
        queryKey: ["grandpas"],
        queryFn: getUserDropdown
    });

    useEffect(() => {
        if (data) {
            setGrandpas(data.data);
        }
    }, [data]);

    return (
        <div className="add_user_page">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Grandpa Dropdown */}
                <FormRow>
                    <FormColumn xl={3} lg={3} md={4} sm={12} xs={12}>
                        <CDropdown
                            control={control}
                            name="grandpaId"
                            label="Grandpa ID"
                            optionLabel="name"
                            optionValue="userId"
                            placeholder="Select Grandpa ID"
                            onChange={(e) => setValue("grandpaId", e.value)}
                            options={grandpas}
                        />
                    </FormColumn>
                </FormRow>

                <div className="form_rows">
                    {/* Render Child Rows */}
                    {fields.map((field, index) => (
                        <ChildRow key={field.id} control={control} index={index} remove={remove} />
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
const ChildRow = ({ control, index, remove }) => {
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
            <FormColumn xl={2} lg={2} md={4} sm={12} xs={12}>
                <button type="button" className="removebtn" onClick={() => remove(index)}>
                    Remove
                </button>
            </FormColumn>
        </FormRow>
    );
};

export default AddUserPage;
