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
import { Input } from "@progress/kendo-react-inputs";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";
import { useNotification } from "../Notification";

const RamEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ram_type, setRamType] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchRamTypes = async () => {
      try {
        const response = await axios.get(`/api/ram_types/${id}/edit`);
        setRamType(response.data);
      } catch (error) {
        console.error("Error fetching RAM types:", error);
      }
    };

    const fetchData = async () => {
      await fetchRamTypes();
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
      const response = await axios.post(`/api/ram_types/${id}/edit`, item);
      addNotification(
        `RAM Type ${dataItem.name} updated successfully`,
        "success"
      );
      navigate("/ramTypes");
    } catch (error) {
      if (dataItem?.name === undefined) {
        addNotification("Please fill out all fields", "error");
      } else if (error.response.status === 501) {
        addNotification("RAM Type already exists", "error");
      } else {
        console.log("Error updating RAM type:", error);
      }
    }
  };

  if (loading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Form
        initialValues={{
          name: ram_type.name,
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
                    defaultValue={ram_type?.name}
                    labelClassName={"k-form-label"}
                    label={"RAM Type"}
                  />
                </div>
              </FieldWrapper>
            </fieldset>
            <div className="k-form-buttons">
              <Button disabled={!formRenderProps.allowSubmit}>Submit</Button>
              <Button onClick={() => navigate("/ramTypes")}>Cancel</Button>
            </div>
          </FormElement>
        )}
      />
    </div>
  );
};
export default RamEdit;
