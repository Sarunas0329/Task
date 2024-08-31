import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { Button } from "@progress/kendo-react-buttons";
import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";
import { Input } from "@progress/kendo-react-inputs";
import { useNotification } from "../Notification";

const SocketTypeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [socketType, setSocketType] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchSocketTypes = async () => {
      try {
        const response = await axios.get(`/api/socketTypes/${id}/edit`);
        setSocketType(response.data);
      } catch (error) {
        console.error("Error fetching socket types:", error);
      }
    };

    const fetchData = async () => {
      await fetchSocketTypes();
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (dataItem) => {
    try {
      var item = {
        id: id,
        name: dataItem.name,
      };
      const response = await axios.post(`/api/socketTypes/${id}/edit`, item);
      addNotification(
        `Socket Type ${dataItem.name} updated successfully`,
        "success"
      );
      navigate("/socketTypes");
    } catch (error) {
      if (dataItem?.name === undefined) {
        addNotification("Please fill out all fields", "error");
      } else if (error.response.status === 501) {
        addNotification("Socket Type already exists", "error");
      } else {
        console.error("Error updating socket type:", error);
      }
    }
  };

  if (loading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

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
      <Form
        initialValues={{
          name: socketType.name,
        }}
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement
            style={{
              maxWidth: 650,
            }}
          >
            <fieldset className={"k-form-fieldset"}>
              <legend className={"k-form-legend"}>
                Please fill in the fields:
              </legend>
              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Field
                    id={"name"}
                    name={"name"}
                    component={Input}
                    labelClassName={"k-form-label"}
                    label={"Socket Type"}
                  />
                </div>
              </FieldWrapper>
            </fieldset>
            <div className="k-form-buttons">
              <Button disabled={!formRenderProps.allowSubmit}>Submit</Button>
              <Button onClick={() => navigate("/socketTypes")}>Cancel</Button>
            </div>
          </FormElement>
        )}
      />
    </div>
  );
};
export default SocketTypeEdit;
