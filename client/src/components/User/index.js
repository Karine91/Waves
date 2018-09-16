import React from "react";
import UserLayout from "../../hoc/user";
import MyButton from "../utils/button";

const UserDashboard = () => {
  return (
    <UserLayout>
      <div className="user_nfo_panel">
        <h1 className="user_nfo_panel_title">User information</h1>

        <div>
          <span>name</span>
          <span>lastname</span>
          <span>email</span>
        </div>
        <MyButton
          type="default"
          title="Edit account info"
          linkTo="/user/user_profile"
        />
      </div>
      <div className="user_nfo_panel">
        <h2 className="user_nfo_panel_title">History purchases</h2>
        <div className="user_product_block_wrapper">History</div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
