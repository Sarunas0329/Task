import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Avatar,
} from "@progress/kendo-react-layout";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <React.Fragment>
        <AppBar className="k-appbar">
          <AppBarSection>
            <h1 className="title">Užduotis</h1>
          </AppBarSection>

          <AppBarSection>
            <ul>
              <li>
                <span onClick={() => navigate("/motherboard")}>
                  Motherboards
                </span>
              </li>
              <li>
                <span onClick={() => navigate("/ramTypes")}>RAM Types</span>
              </li>
              <li>
                <span onClick={() => navigate("/socketTypes")}>
                  Socket Types
                </span>
              </li>
            </ul>
          </AppBarSection>
        </AppBar>
      </React.Fragment>
    </div>
  );
};

export default Home;
