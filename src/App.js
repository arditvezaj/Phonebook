import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";

import "./globals.css";

function App() {
  return (
    <BrowserRouter>
      <Link to="/">
        <h1 className="bg-black text-white text-3xl p-4">PhoneBook</h1>
      </Link>
      <section className="mx-[4rem] 2xl:mx-[10rem]">
        <Routes>
          <Route path="/">
            <Route index element={<Contacts />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
          </Route>
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
