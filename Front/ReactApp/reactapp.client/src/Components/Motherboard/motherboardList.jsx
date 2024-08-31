import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import "@progress/kendo-theme-default/dist/all.css";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";

const MotherboardList = () => {
  const navigate = useNavigate();
  const [motherboards, setMotherboards] = useState([]);

  useEffect(() => {
    const fetchMotherboards = async () => {
      try {
        const response = await axios.get("/api/motherboard/list");
        setMotherboards(response.data);
      } catch (error) {
        console.error("Error fetching motherboard data:", error);
      }
    };
    fetchMotherboards();
  }, []);

  const handleEdit = (motherboard) => {
    navigate(`/motherboard/${motherboard.id}/edit`, {
      state: {
        id: motherboard.id,
      },
    });
  };
  const handleDelete = (motherboard) => {
    navigate(`/motherboard/${motherboard.id}/delete`);
  };
  const handleAdd = () => {
    navigate("/motherboard/add");
  };
  const handleView = (motherboard) => {
    console.log("Motherboard id: ", motherboard.id);
    navigate(`/motherboard/${motherboard.id}`);
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
      <Button onClick={() => handleAdd()}>Add new Motherboard</Button>
      <Grid data={motherboards}>
        <Column field="model" title="Model" />
        <Column field="socket" title="Socket Type" />
        <Column field="raM_Type" title="RAM Type" />
        <Column field="raM_Slots" title="RAM Slots" />
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

export default MotherboardList;
