import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialLinks = props => (
  <div>
    <FontAwesomeIcon
      icon={props.icon}
      size={props.size}
      style={{ verticalAlign: "top" }}
    />

    <span
      className={`d-inline-block ${props.padding}`}
      style={{ verticalAlign: "text-top" }}
    >
      <h4 className="card-title">{props.link}</h4>
    </span>
  </div>
);
export default SocialLinks;
