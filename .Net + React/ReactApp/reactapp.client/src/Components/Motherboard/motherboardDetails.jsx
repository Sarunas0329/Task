import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { Button } from "@progress/kendo-react-buttons";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";

const MotherboardDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [motherboard, setMotherboard] = useState({});

  useEffect(() => {
    const fetchMotherboard = async () => {
      try {
        const response = await axios.get(`/api/motherboard/${id}/details`);
        setMotherboard(response.data);
      } catch (error) {
        console.error("Error fetching motherboard data:", error);
      }
    };
    fetchMotherboard();
  }, [id]);

  return (
    <div>
      <h3 style={{ fontWeight: "bold" }}>Motherboard Details</h3>
      <div>
        <p>Model: {motherboard.model}</p>
        <p>Socket: {motherboard.socket}</p>
        <p>RAM Type: {motherboard.raM_Type}</p>
        <p>RAM Slots: {motherboard.raM_Slots}</p>
        <Button onClick={() => navigate(`/motherboard/${id}/edit`)}>
          Edit
        </Button>
        <Button onClick={() => navigate("/motherboard")}>Back</Button>
      </div>
    </div>
  );
};

export default MotherboardDetails;
