import React from "react";
import { faMobileAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/fontawesome-free-brands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cardPic from "./cardPic.jpg";
import SocialLinks from "./SocialLinks";
import { getCookie } from "../utilities/AppUtility";
import { LinkContainer } from "react-router-bootstrap";
import "./ContactCard.scss";
import { s3Download } from "../service/s3Download";
import { API } from "aws-amplify";

const downloadFile = () => {
  const file = API.get("profiles", "/download");
  // const key = s3Download(
  //   "Vikas-Architect_JAVA_REACT_Web_DeveloperACS-13.6yrs.pdf"
  // );
  console.log();
};

const gotoSignUp = props => {
  props.handleLogout(true);
};

const ContactCard = props => (
  <div className="contactCard">
    <div className="card flex-row flex-wrap">
      <div className="card-header border-0">
        <img src={cardPic} alt="" style={{ padding: "7px 0" }} />
      </div>
      <div className="card-block" style={{ margin: "5% auto 0 auto" }}>
        <SocialLinks
          icon={faGithub}
          size="2x"
          padding="pl-3 pb-4"
          link={
            <a href={props.profileData.header.git} target="_blank">
              Git
            </a>
          }
        />
        <SocialLinks
          icon={faLinkedin}
          size="2x"
          padding="pl-3 pb-4"
          link={
            <a href={props.profileData.header.in} target="_blank">
              LinkedIN
            </a>
          }
        />
        <SocialLinks
          size="2x"
          padding="pl-3 pb-4"
          icon={faMobileAlt}
          link={
            getCookie("isSkipLogin") === "true"
              ? "You Have Skipped Login ;)"
              : props.profileData.header.cell
          }
        />
        {getCookie("isSkipLogin") === "true" && (
          <a href="#" onClick={() => props.handleLogout(true)}>
            Signup (to see how it works)
          </a>
        )}
        {getCookie("isSkipLogin") !== "true" && (
          <a
            href="https://profiles-app.s3-ap-southeast-1.amazonaws.com/Vikas_K_Senior_Developer_Java_React.pdf"
            className="btn btn-common"
            target="_blank"
          >
            <FontAwesomeIcon icon={faPaperclip} />
            <span className="pl-2">Download Resume [Old School]</span>
          </a>
        )}
      </div>
      <div className="w-100" />
      <div className="card-footer w-100 text-muted text-center">
        Opportunities are more and Time is less, Call me before anyone else!
      </div>
    </div>
  </div>
);
export default ContactCard;
