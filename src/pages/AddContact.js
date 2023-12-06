import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";

import Button from "../components/Button";
import Input from "../components/Input";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues = {
  name: "",
  lastName: "",
  address: "",
  city: "",
  country: "",
  email: [" "],
  number: [" "],
};

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return "";
  }
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, (obj) => showErrors("Name", obj.value.length, obj.min))
    .required(),
  lastName: yup
    .string()
    .min(3, (obj) => showErrors("Last Name", obj.value.length, obj.min))
    .required(),
  address: yup
    .string()
    .min(3, (obj) => showErrors("Address", obj.value.length, obj.min))
    .required(),
  country: yup
    .string()
    .min(3, (obj) => showErrors("Country", obj.value.length, obj.min))
    .required(),
  city: yup
    .string()
    .min(3, (obj) => showErrors("City", obj.value.length, obj.min))
    .required(),
  email: yup
    .array()
    .of(
      yup
        .string()
        .email("Should be a valid email")
        .required("Email is required")
    )
    .min(1, "At least one email is required"),
  number: yup
    .array()
    .of(
      yup
        .string()
        .min(6, (obj) => showErrors("Number", obj.value.length, obj.min))
        .required("Number is required")
    )
    .min(1, "At least one number is required"),
});

const AddContact = () => {
  const { control, handleSubmit, trigger } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const { fields: numbers, append: numberAppend } = useFieldArray({
    control,
    name: "number",
  });

  const { fields: emails, append: emailAppend } = useFieldArray({
    control,
    name: "email",
  });

  const addContact = (data) => {
    const existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    existingContacts.push({ id: new Date().getTime().toString(), ...data });

    localStorage.setItem("contacts", JSON.stringify(existingContacts));
  };

  const onSubmit = async (data) => {
    addContact(data);

    navigate("/");
  };

  const addNewEmail = async () => {
    if (await trigger("email")) {
      emailAppend("");
    }
  };

  const addNewNumber = async () => {
    if (await trigger("number")) {
      numberAppend("");
    }
  };

  return (
    <section className="flex flex-col items-center my-10">
      <h1 className="text-2xl font-bold w-full mb-10">
        {"Register new contact"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <label>Name:</label>
        <Input control={control} name="name" placeholder="Enter Name" />
        <label>Last Name:</label>
        <Input
          control={control}
          name="lastName"
          placeholder="Enter Last Name"
        />
        <label>Address:</label>
        <Input control={control} name="address" placeholder="Enter Address" />
        <label>City:</label>
        <Input control={control} name="city" placeholder="Enter City" />
        <label>Country:</label>
        <Input control={control} name="country" placeholder="Enter Country" />
        <label>Email:</label>
        <div
          className={`w-full flex gap-4 ${
            emails.length > 1 && "flex-col gap-0"
          } `}
        >
          <div className="w-full flex flex-col">
            {emails.map((email, index) => (
              <Input
                key={email.id}
                control={control}
                name={`email.${index}`}
                type="email"
                placeholder="Enter Email"
              />
            ))}
          </div>
          <Button
            title="Add"
            type="button"
            alignItems={emails.length > 1 && "self-end"}
            bgColor="bg-blue-600"
            onClick={addNewEmail}
          />
        </div>
        <label>Number:</label>
        <div
          className={`w-full flex gap-4 ${
            numbers.length > 1 && "flex-col gap-0"
          } `}
        >
          <div className="w-full flex flex-col">
            {numbers.map((number, index) => (
              <Input
                key={number.id}
                control={control}
                name={`number.${index}`}
                placeholder="Enter Number"
              />
            ))}
          </div>
          <Button
            title="Add"
            type="button"
            alignItems={numbers.length > 1 && "self-end"}
            bgColor="bg-blue-600"
            onClick={addNewNumber}
          />
        </div>
        <Button type="submit" title="Save" bgColor="bg-blue-600" width="w-20" />
      </form>
    </section>
  );
};

export default AddContact;
