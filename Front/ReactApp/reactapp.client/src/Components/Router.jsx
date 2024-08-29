import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MotherboardList from "./Motherboard/motherboardList";
import MotherboardEdit from "./Motherboard/motherboardEdit";
import MotherboardDelete from "./Motherboard/motherboardDelete";
// import MotherboardAdd from "./Motherboard/motherboardCreate";
import MotherboardView from "./Motherboard/motherboardDetails";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MotherboardList />} />
        <React.Fragment>
          <Route path="/motherboard/:id/edit" element={<MotherboardEdit />} />
          <Route path="/motherboard/:id" element={<MotherboardView />} />
          <Route
            path="/motherboard/:id/delete"
            element={<MotherboardDelete />}
          />
        </React.Fragment>
      </Routes>
    </Router>
  );
};

export default AppRouter;
