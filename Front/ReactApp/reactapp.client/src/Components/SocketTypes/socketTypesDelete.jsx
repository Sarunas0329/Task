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
const SocketTypeDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [socketType, setSocketTypes] = useState({});
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchSocketTypes = async () => {
      try {
        const response = await axios.get(`/api/socketTypes/${id}/details`);
        setSocketTypes(response.data);
      } catch (error) {
        console.error("Error fetching socket type data:", error);
      }
    };
    fetchSocketTypes();
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this Socket Type?")) {
      axios
        .post(`/api/socketTypes/${id}/delete`)
        .then(() => {
          addNotification("Socket Type deleted", "success");
          navigate("/socketTypes", { delete: true });
        })
        .catch((error) => {
          if (error.response.status === 500) {
            addNotification(
              "Cannot delete Socket Type because it is used in another Motherboard",
              "error"
            );
          } else {
            console.error("Error deleting socket type:", error);
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
      <h1>Socket Type Details</h1>
      <div>
        <p>Name: {socketType.name}</p>
        <DeleteButton onClick={() => handleDelete()}>Delete</DeleteButton>
        <Button onClick={() => navigate("/socketTypes")}>Back</Button>
      </div>
    </div>
  );
};

export default SocketTypeDelete;
