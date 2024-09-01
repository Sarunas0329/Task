import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";
import "@progress/kendo-theme-default/dist/all.css";

const SocketTypesList = () => {
  const navigate = useNavigate();
  const [socketTypes, setSocketTypes] = useState([]);

  useEffect(() => {
    const fetchSocketTypes = async () => {
      try {
        const response = await axios.get("/api/socketTypes/list");
        setSocketTypes(response.data);
      } catch (error) {
        console.error("Error fetching socket type data:", error);
      }
    };
    fetchSocketTypes();
  }, []);

  const handleEdit = (socketType) => {
    navigate(`/socketTypes/${socketType.id}/edit`, {
      state: {
        id: socketType.id,
      },
    });
  };
  const handleDelete = (socketType) => {
    navigate(`/socketTypes/${socketType.id}/delete`);
  };
  const handleAdd = () => {
    navigate("/socketTypes/add");
  };
  const handleView = (socketType) => {
    navigate(`/socketTypes/${socketType.id}`);
  };

  return (
    <div>
      <Button onClick={() => handleAdd()}>Add new Socket Type</Button>
      <Grid data={socketTypes}>
        <Column field="name" title="Name" />
        <Column
          cell={(props) => (
            <td>
              <Button onClick={() => handleView(props.dataItem)}>
                Details
              </Button>
              <Button onClick={() => handleEdit(props.dataItem)}>Edit</Button>
              <Button onClick={() => handleDelete(props.dataItem)}>
                Delete
              </Button>
            </td>
          )}
        />
      </Grid>
    </div>
  );
};

export default SocketTypesList;
