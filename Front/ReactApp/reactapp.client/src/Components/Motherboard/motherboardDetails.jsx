import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { Button } from "@progress/kendo-react-buttons";

const MotherboardDetails = () => {
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

  return (
    <div>
      <h1>Motherboard Details</h1>
      <div>
        <h3>Model: {motherboard.model}</h3>
        <p>Socket: {motherboard.socket}</p>
        <p>RAM Type: {motherboard.raM_Type}</p>
        <p>RAM Slots: {motherboard.raM_Slots}</p>
        <Button onClick={() => navigate("/")}>Back</Button>
      </div>
    </div>
  );
};

export default MotherboardDetails;
