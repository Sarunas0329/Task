import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { Button } from "@progress/kendo-react-buttons";
import styled from "styled-components";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";
import { useNotification } from "../Notification";

const DeleteButton = styled(Button)`
  background-color: red;
`;
const RamDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ram_types, setRamTypes] = useState({});
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchRamTypes = async () => {
      try {
        const response = await axios.get(`/api/ram_types/${id}/details`);
        setRamTypes(response.data);
      } catch (error) {
        console.error("Error fetching RAM type data:", error);
      }
    };
    fetchRamTypes();
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this RAM Type?")) {
      axios
        .post(`/api/ram_types/${id}/delete`)
        .then(() => {
          addNotification("RAM Type deleted", "success");
          navigate("/ramTypes", { delete: true });
        })
        .catch((error) => {
          if (error.response.status === 500) {
            addNotification(
              "Cannot delete RAM Type because it is used in another Motherboard",
              "error"
            );
          }
        });
    }
  };

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
      <p style={{ fontWeight: "bold" }}>RAM Type Details</p>
      <div>
        <p>Name: {ram_types.name}</p>
        <DeleteButton onClick={() => handleDelete()}>Delete</DeleteButton>
        <Button onClick={() => navigate("/ramTypes")}>Back</Button>
      </div>
    </div>
  );
};

export default RamDelete;
