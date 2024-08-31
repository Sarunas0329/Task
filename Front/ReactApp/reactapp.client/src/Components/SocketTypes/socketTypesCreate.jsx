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

const SocketTypeCreate = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleSubmit = async (dataItem) => {
    try {
      var item = {
        id: dataItem.id,
        name: dataItem.name,
      };
      const response = await axios.post(`/api/socketTypes/create`, item);
      addNotification(
        `Socket Type ${dataItem.name} created successfully`,
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
                Please fill in the field:
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
export default SocketTypeCreate;
