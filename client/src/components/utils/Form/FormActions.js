export const validate = (element, formData = []) => {
  let error = [true, ""];

  if (element.validation.email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = re.test(element.value);
    let message = !valid ? "Must be a valid email" : "";
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    let valid =
      element.value.trim() === formData[element.validation.confirm].value;
    let message = !valid ? "Passwords do not match" : "";
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.minlength) {
    let valid = element.value.trim().length >= element.validation.minlength;
    let message = !valid
      ? `This field must contain at least ${
          element.validation.minlength
        } characters`
      : "";
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    let valid = element.value.trim() !== "";
    let message = !valid ? "This field is required" : "";
    error = !valid ? [valid, message] : error;
  }

  return error;
};

export const update = (element, formdata, formName) => {
  const newFormdata = { ...formdata };

  const newElement = {
    ...newFormdata[element.id]
  };

  newElement.value = element.event.target.value;

  if (element.blur) {
    [newElement.valid, newElement.validationMessage] = validate(
      newElement,
      formdata
    );
  }

  newElement.touched = element.blur;
  newFormdata[element.id] = newElement;

  return newFormdata;
};

export const generateData = (formdata, formName) => {
  let dataToSubmit = {};

  for (let key in formdata) {
    if (key !== "confirmPassword") {
      dataToSubmit[key] = formdata[key].value;
    }
  }

  return dataToSubmit;
};

export const isFormValid = (formdata, formName) => {
  let formIsValid = true;
  for (let key in formdata) {
    formIsValid = formdata[key].valid && formIsValid;
  }

  return formIsValid;
};
