import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { Button } from "@progress/kendo-react-buttons";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";

const SocketTypeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [socketType, setSocketTypes] = useState({});

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

  return (
    <div>
      <h1>RAM Type Details</h1>
      <div>
        <p>Name: {socketType.name}</p>
        <Button onClick={() => navigate("/socketTypes")}>Back</Button>
        <Button onClick={() => navigate(`/socketTypes/${id}/edit`)}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default SocketTypeDetails;
