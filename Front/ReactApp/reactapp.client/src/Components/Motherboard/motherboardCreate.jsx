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
import { ComboBox, DropDownList } from "@progress/kendo-react-dropdowns";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";
import { useNotification } from "../Notification";

const MotherboardCreate = () => {
  const navigate = useNavigate();
  const [socketTypes, setSocketTypes] = useState([]);
  const [ram_types, setRamTypes] = useState([]);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchSocketTypes = async () => {
      try {
        const response = await axios.get(`/api/socketTypes/list`);
        setSocketTypes(response.data);
      } catch (error) {
        console.error("Error fetching socket types:", error);
        addNotification("Error fetching socket types", "error");
      }
    };

    const fetchRamTypes = async () => {
      try {
        const response = await axios.get(`/api/ram_types/list`);
        setRamTypes(response.data);
      } catch (error) {
        console.error("Error fetching RAM types:", error);
        addNotification("Error fetching RAM types", "error");
      }
    };

    const fetchData = async () => {
      await fetchSocketTypes();
      await fetchRamTypes();
    };
    fetchData();
  }, []);

  const handleSubmit = async (dataItem) => {
    try {
      var item = {
        id: dataItem.id,
        model: dataItem.model,
        raM_Slots: dataItem.raM_Slots,
        raM_Type: dataItem.ram_type.name,
        raM_TypeId: dataItem.ram_type.id,
        raM_TypesList: ram_types,
        socket: dataItem.socket.name,
        socketId: dataItem.socket.id,
        socketTypesList: socketTypes,
      };
      const response = await axios.post(`/api/motherboard/create`, item);
      navigate("/motherboard");
      addNotification(
        `Motherboard ${dataItem.model} created successfully`,
        "success"
      );
    } catch (error) {
      console.log(dataItem.model);
      if (
        dataItem?.model === undefined ||
        dataItem?.raM_Slots === undefined ||
        dataItem?.raM_Type === undefined ||
        dataItem?.socket === undefined
      ) {
        addNotification("Please fill out all fields", "error");
      }
      console.error(error);
    }
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
      <Form
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
                <div className="k-form-field-wrap">
                  <Field
                    id={"raM_Slots"}
                    name={"raM_Slots"}
                    component={Input}
                    labelClassName={"k-form-label"}
                    label={"RAM Slots"}
                  />
                </div>
              </FieldWrapper>
            </fieldset>
            <div className="k-form-buttons">
              <Button disabled={!formRenderProps.allowSubmit}>Submit</Button>
              <Button onClick={() => navigate("/motherboard")}>Cancel</Button>
            </div>
          </FormElement>
        )}
      />
    </div>
  );
};
export default MotherboardCreate;
