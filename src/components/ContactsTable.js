import { Link } from "react-router-dom";

import Button from "./Button";
import { useEffect, useState } from "react";

const columns = [
  "Name",
  "Last Name",
  "Address",
  "City",
  "Country",
  "Email",
  "Number",
  "Edit",
  "Delete",
];

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(storedContacts);
  }, []);

  const deleteContact = (id) => {
    const indexToRemove = contacts.findIndex((contact) => contact.id === id);

    if (indexToRemove !== -1) {
      contacts.splice(indexToRemove, 1);

      localStorage.setItem("contacts", JSON.stringify(contacts));
      const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];

      setContacts(storedContacts);
    }
  };

  return (
    <>
      {contacts.length === 0 ? (
        <h1 className="mt-24 text-2xl text-red-600 font-bold">
          No Contacts Found
        </h1>
      ) : (
        <table className="mt-24">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={column} className="border py-3 px-10">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border py-3 px-10 text-center">
                  {contact.name}
                </td>
                <td className="border py-3 px-10 text-center">
                  {contact.lastName}
                </td>
                <td className="border py-3 px-10 text-center">
                  {contact.address}
                </td>
                <td className="border py-3 px-10 text-center">
                  {contact.city}
                </td>
                <td className="border py-3 px-10 text-center">
                  {contact.country}
                </td>
                <td className="border py-3 px-10 text-center">
                  {contact.email.map((email) => (
                    <p key={email}>{email}</p>
                  ))}
                </td>
                <td className="border py-3 px-10 text-center">
                  {contact.number.map((number) => (
                    <p key={number}>{number}</p>
                  ))}
                </td>
                <td className="border py-3 px-10 text-center">
                  <Link to={`/edit/${contact.id}`}>
                    <Button title="Edit" bgColor="bg-green-700" />
                  </Link>
                </td>
                <td className="border py-3 px-10">
                  <Button
                    title="Delete"
                    bgColor="bg-red-500"
                    onClick={() => deleteContact(contact.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ContactsTable;
