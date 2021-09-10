import React from "react";
import { NavBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "./index.css";
function navBar(props) {
  return (
    <NavBar
      className="navbar"
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={() => props.history.goBack()}
    >
      {props.children}
    </NavBar>
  );
}
navBar.propTypes = {
  children: PropTypes.string.isRequired,
};
export default withRouter(navBar);
