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
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { ComboBox, DropDownList } from "@progress/kendo-react-dropdowns";

const MotherboardEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [motherboard, setMotherboard] = useState(null);
  const [socketTypes, setSocketTypes] = useState([]);
  const [ram_types, setRamTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotherboard = async () => {
      try {
        const response = await axios.get(`/api/motherboard/${id}/details`);
        console.log("motherboard", response.data);
        setMotherboard(response.data);
      } catch (error) {
        console.error("Error fetching motherboard data:", error);
      }
    };

    const fetchSocketTypes = async () => {
      try {
        const response = await axios.get(`/api/socketTypes/list`);
        console.log("socket", response.data);
        setSocketTypes(response.data);
      } catch (error) {
        console.error("Error fetching socket types:", error);
      }
    };

    const fetchRamTypes = async () => {
      try {
        const response = await axios.get(`/api/ram_types/list`);
        console.log("ram", response.data);
        setRamTypes(response.data);
        console.log("RAM: ", ram_types.length);
      } catch (error) {
        console.error("Error fetching RAM types:", error);
      }
    };

    const fetchData = async () => {
      await fetchMotherboard();
      await fetchSocketTypes();
      await fetchRamTypes();
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (dataItem) => {
    alert(JSON.stringify(dataItem, null, 2));
  };

  if (loading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  return (
    <Form
      initialValues={{
        model: motherboard?.model,
        socket: { name: motherboard?.socket, id: motherboard?.socketId },
        ram_type: { name: motherboard?.raM_Type, id: motherboard?.raM_TypeId },
        raM_Slots: motherboard?.raM_Slots,
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
                  id={"model"}
                  name={"model"}
                  component={Input}
                  defaultValue={motherboard?.model}
                  labelClassName={"k-form-label"}
                  label={"Model"}
                />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  component={ComboBox}
                  name={"socket"}
                  data={socketTypes}
                  textField={"name"}
                  dataItemKey={"id"}
                  labelClassName={"k-form-label"}
                  label={"Socket"}
                />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  component={ComboBox}
                  name={"ram_type"}
                  data={ram_types}
                  textField={"name"}
                  dataItemKey={"id"}
                  labelClassName={"k-form-label"}
                  label={"RAM Type"}
                />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <Field
                id={"raM_Slots"}
                name={"raM_Slots"}
                component={Input}
                defaultValue={motherboard?.raM_Slots}
                labelClassName={"k-form-label"}
                label={"RAM Slots"}
              />
            </FieldWrapper>
          </fieldset>
          <div className="k-form-buttons">
            <Button disabled={!formRenderProps.allowSubmit}>Submit</Button>
          </div>
        </FormElement>
      )}
    />
  );
};
export default MotherboardEdit;
