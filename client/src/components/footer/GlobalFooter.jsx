import React from "react";
import "./GlobalFooter.scss";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GlobalFooter = () => (
  <div className="t-fixed-footer container-fluid text-light">
    <span className="pr-4">
      <strong>©2019.</strong> All rights reserved
    </span>
    <FontAwesomeIcon icon={faEnvelope} />
    <span className="d-inline-block pl-1">kulkarni.vikasdk@gmail.com</span>
  </div>
);
export default GlobalFooter;
