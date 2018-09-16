import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";
import { loginUser } from "../../actions/user_actions";

export class Login extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  onSubmitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "login");

    let formIsValid = isFormValid(this.state.formData, "login");
    if (formIsValid) {
      this.props.loginUser(dataToSubmit).then(res => {
        if (res.payload.loginSuccess) {
          this.props.history.push("/dashboard");
        } else {
          this.setState({
            formError: true
          });
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "login");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={this.onSubmitForm} noValidate>
          <FormField
            id="email"
            formdata={this.state.formData.email}
            change={this.updateForm}
          />

          <FormField
            id="password"
            formdata={this.state.formData.password}
            change={this.updateForm}
          />

          {this.state.formError && (
            <div className="error_label">Please check your data</div>
          )}
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { loginUser }
)(withRouter(Login));
