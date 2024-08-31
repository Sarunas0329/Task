import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MotherboardList from "./Motherboard/motherboardList";
import MotherboardEdit from "./Motherboard/motherboardEdit";
import MotherboardDelete from "./Motherboard/motherboardDelete";
import MotherboardCreate from "./Motherboard/motherboardCreate";
import MotherboardView from "./Motherboard/motherboardDetails";
import Home from "./Home";

import RamList from "./RAMTypes/ramTypesList";
import RamCreate from "./RAMTypes/ramTypesCreate";
import RamDelete from "./RAMTypes/ramTypesDelete";
import RamDetails from "./RAMTypes/ramTypesDetails";
import RamEdit from "./RAMTypes/ramTypesEdit";

import SocketTypesList from "./SocketTypes/socketTypesList";
import SocketTypeCreate from "./SocketTypes/socketTypesCreate";
import SocketTypeDelete from "./SocketTypes/socketTypesDelete";
import SocketTypeDetails from "./SocketTypes/socketTypesDetails";
import SocketTypeEdit from "./SocketTypes/socketTypesEdit";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/motherboard" element={<MotherboardList />} />
        <Route path="/motherboard/:id/edit" element={<MotherboardEdit />} />
        <Route path="/motherboard/:id" element={<MotherboardView />} />
        <Route path="/motherboard/:id/delete" element={<MotherboardDelete />} />
        <Route path="/motherboard/add" element={<MotherboardCreate />} />

        <Route path="/ramTypes" element={<RamList />} />
        <Route path="/ramTypes/add" element={<RamCreate />} />
        <Route path="/ramTypes/:id/delete" element={<RamDelete />} />
        <Route path="/ramTypes/:id" element={<RamDetails />} />
        <Route path="/ramTypes/:id/edit" element={<RamEdit />} />

        <Route path="/socketTypes" element={<SocketTypesList />} />
        <Route path="/socketTypes/add" element={<SocketTypeCreate />} />
        <Route path="/socketTypes/:id/delete" element={<SocketTypeDelete />} />
        <Route path="/socketTypes/:id" element={<SocketTypeDetails />} />
        <Route path="/socketTypes/:id/edit" element={<SocketTypeEdit />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
