import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";

import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";
import { registerUser } from "../../actions/user_actions";

export class Register extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter your name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Enter your lastname"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
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
          required: true,
          minlength: 5
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirm_password_input",
          type: "password",
          placeholder: "Confirm your password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  onSubmitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "register");

    let formIsValid = isFormValid(this.state.formData, "register");

    if (formIsValid) {
      this.props
        .registerUser(dataToSubmit)
        .then(res => {
          if (res.payload.success) {
            this.setState({
              formError: false,
              formSuccess: true
            });
            setTimeout(() => {
              this.props.history.push("/register_login");
            }, 3000);
          } else {
            this.setState({
              formError: true
            });
          }
        })
        .catch(err => {
          this.setState({
            formError: true
          });
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "register");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={this.onSubmitForm} noValidate>
                <h2>Personal Information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id="name"
                      formdata={this.state.formData.name}
                      change={this.updateForm}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id="lastname"
                      formdata={this.state.formData.lastname}
                      change={this.updateForm}
                    />
                  </div>
                </div>

                <FormField
                  id="email"
                  formdata={this.state.formData.email}
                  change={this.updateForm}
                />

                <h2>Verify password</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id="password"
                      formdata={this.state.formData.password}
                      change={this.updateForm}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id="confirmPassword"
                      formdata={this.state.formData.confirmPassword}
                      change={this.updateForm}
                    />
                  </div>
                </div>

                {this.state.formError && (
                  <div className="error_label">Please check your data</div>
                )}
                <button>create an account</button>
              </form>
            </div>
          </div>
        </div>
        <Dialog open={!!this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Congratulations !</div>
            <p>You will be redirected to the LOGIN in a couple seconds...</p>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  null,
  { registerUser }
)(withRouter(Register));
