import React from "react";
import MyButton from "../utils/button";
import Login from "./login";

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              placeat aut fuga nihil amet quasi eius facilis dolore, quas
              perspiciatis saepe praesentium in quisquam! Iusto hic dolorum
              consequatur natus rem?
            </p>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: "10px 0 0 0"
              }}
            />
          </div>
          <div className="right">
            <h2>Register customers</h2>
            <p>If you have an account please log in</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
