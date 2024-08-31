import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import "@progress/kendo-theme-default/dist/all.css";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";

const RamList = () => {
  const navigate = useNavigate();
  const [ram_types, setRamTypes] = useState([]);

  useEffect(() => {
    const fetchRamTypes = async () => {
      try {
        const response = await axios.get("/api/ram_types/list");
        setRamTypes(response.data);
      } catch (error) {
        console.error("Error fetching ram type data:", error);
      }
    };
    fetchRamTypes();
  }, []);

  const handleEdit = (ramType) => {
    navigate(`/ramTypes/${ramType.id}/edit`, {
      state: {
        id: ramType.id,
      },
    });
  };
  const handleDelete = (ramType) => {
    navigate(`/ramTypes/${ramType.id}/delete`);
  };
  const handleAdd = () => {
    navigate("/ramTypes/add");
  };
  const handleView = (ramType) => {
    navigate(`/ramTypes/${ramType.id}`);
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
      <Button onClick={() => handleAdd()}>Add new RAM Type</Button>
      <Grid data={ram_types}>
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

export default RamList;
