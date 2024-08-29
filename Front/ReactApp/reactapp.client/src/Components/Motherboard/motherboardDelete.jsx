import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { Button } from "@progress/kendo-react-buttons";
import styled from "styled-components";

const DeleteButton = styled(Button)`
  background-color: red;
`;
const MotherboardDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [motherboard, setMotherboard] = useState({});

  console.log("Motherboard ID: ", id);
  useEffect(() => {
    const fetchMotherboard = async () => {
      try {
        const response = await axios.get(`/api/motherboard/${id}/details`);
        console.log(response.data);
        setMotherboard(response.data);
      } catch (error) {
        console.error("Error fetching motherboard data:", error);
      }
    };
    fetchMotherboard();
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this motherboard?")) {
      axios
        .post(`/api/motherboard/${id}/delete`)
        .then(() => {
          navigate("/", { delete: true });
        })
        .catch((error) => {
          console.error("Error deleting motherboard:", error);
        });
    }
  };

  return (
    <div>
      <h1>Motherboard Details</h1>
      <div>
        <h3>Model: {motherboard.model}</h3>
        <p>Socket: {motherboard.socket}</p>
        <p>RAM Type: {motherboard.raM_Type}</p>
        <p>RAM Slots: {motherboard.raM_Slots}</p>
        <DeleteButton onClick={() => handleDelete()}>Delete</DeleteButton>
        <Button onClick={() => navigate("/")}>Back</Button>
      </div>
    </div>
  );
};

export default MotherboardDelete;
