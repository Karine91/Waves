import React from "react";

const FormField = ({ formdata, change, id }) => {
  const showError = () => {
    if (formdata.validation && !formdata.valid) {
      return <div className="error_label">{formdata.validationMessage}</div>;
    }
  };

  const renderTemplate = () => {
    let formTemplate;
    switch (formdata.element) {
      case "input":
        formTemplate = (
          <div className="formBlock">
            <input
              {...formdata.config}
              value={formdata.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />

            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = "";
    }
    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormField;
