import { Link } from "react-router-dom";

import ContactsTable from "../components/ContactsTable";
import Button from "../components/Button";

const Contacts = () => {

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Link to="/add">
          <Button title="Add Contact" bgColor="bg-blue-500" />
        </Link>
      </div>
      <ContactsTable />
    </div>
  );
};

export default Contacts;
