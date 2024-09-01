import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { Button } from "@progress/kendo-react-buttons";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";

const RamDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ram_type, setRamType] = useState({});

  useEffect(() => {
    const fetchRamTypes = async () => {
      try {
        const response = await axios.get(`/api/ram_types/${id}/details`);
        setRamType(response.data);
      } catch (error) {
        console.error("Error fetching RAM type data:", error);
      }
    };
    fetchRamTypes();
  }, [id]);

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>RAM Type Details</p>
      <div>
        <p>Name: {ram_type.name}</p>
        <Button onClick={() => navigate("/ramTypes")}>Back</Button>
        <Button onClick={() => navigate(`/ramTypes/${id}/edit`)}>Edit</Button>
      </div>
    </div>
  );
};

export default RamDetails;
