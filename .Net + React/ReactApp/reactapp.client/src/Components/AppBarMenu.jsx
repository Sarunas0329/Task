import React, { useEffect, useState, useRef } from "react";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";
import { useParams, useNavigate } from "react-router-dom";

const AppBarMenu = () => {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar className="k-appbar">
        <AppBarSection>
          <h1 className="title">Užduotis</h1>
        </AppBarSection>

        <AppBarSection>
          <ul>
            <li>
              <span onClick={() => navigate("/motherboard")}>Motherboards</span>
            </li>
            <li>
              <span onClick={() => navigate("/ramTypes")}>RAM Types</span>
            </li>
            <li>
              <span onClick={() => navigate("/socketTypes")}>Socket Types</span>
            </li>
          </ul>
        </AppBarSection>
      </AppBar>
    </div>
  );
};
export default AppBarMenu;
