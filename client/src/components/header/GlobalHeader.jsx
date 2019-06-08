import React, { Component, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./_header.scss";
import rounded from "./rounded.jpg";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GlobalHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-custom text-light fixed-top mx-4 mt-2 justify-content-between">
        <div className="d-flex">
          <LinkContainer to="/home">
            <a href="#" className="a-style">
              <FontAwesomeIcon icon={faHome} size="2x" />
            </a>
          </LinkContainer>
          <a>
            <span className="navbar-brand">Vikas Kulkarni</span>
            <div
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "12px",
                fontStyle: "italic"
              }}
            >
              -Another Full Stack Developer
            </div>
          </a>

          <img
            src={rounded}
            alt="Avatar"
            style={{ borderRadius: "50%" }}
            height="50"
            width="50"
          />
        </div>
        {this.props.isAuthenticated && (
          <div
            style={{
              fontSize: "12px",
              width: "842px",
              textAlign: "justify"
            }}
          >
            13+ years of in-depth experience in End to End Software life cycle
            has made me a result driven, self-motivated and committed
            professional with expertise in both Front end and Backend
            Technologies. My goal is to find a suitable position with Architect,
            Design and Development
          </div>
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {this.props.isAuthenticated ? (
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              />
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
                style={{ marginTop: "18px", left: "-105px" }}
              >
                <LinkContainer to="/contact">
                  <a className="dropdown-item" href="#">
                    Contact Card
                  </a>
                </LinkContainer>
                <LinkContainer to="/about">
                  <a className="dropdown-item" href="#">
                    About this site
                  </a>
                </LinkContainer>
                <div className="dropdown-divider" />
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={this.props.handleLogout}
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
        ) : (
          <Fragment>
            <ul className="navbar-nav">
              <LinkContainer to="/signup">
                <li className="nav-item">Signup (to see how it works)</li>
              </LinkContainer>
              <span style={{ color: "gray", fontWeight: "bold" }}>|</span>
              <LinkContainer to="/login">
                <li className="nav-item">Login</li>
              </LinkContainer>
            </ul>
          </Fragment>
        )}
      </nav>
    );
  }
}

export default GlobalHeader;
