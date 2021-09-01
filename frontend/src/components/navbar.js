import React from "react";
import "../styles/_navbar.scss";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Component } from "react";

class navbar extends Component {
  render() {
    return (
      //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //     <img className="logo" src={logo} alt="logo groupomania"></img>
      //     <button
      //       className="navbar-toggler"
      //       type="button"
      //       data-toggle="collapse"
      //       data-target="#navbarNav"
      //       aria-controls="navbarNav"
      //       aria-expanded="false"
      //       aria-label="Toggle navigation"
      //     >
      //       <span className="navbar-toggler-icon"></span>
      //     </button>
      //     <div className="collapse navbar-collapse" id="navbarNav">
      //       <ul className="navbar-nav">
      //         <li className="nav-item active">
      //           <Link className="nav-link" to="/feed">
      //             {" "}
      //             Accueil
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link className="nav-link" to="/profile">
      //             {" "}
      //             Profile
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link className="nav-link" to="/feed">
      //             {" "}
      //             Déconnexion
      //           </Link>
      //         </li>
      //       </ul>
      //     </div>
      //   </nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img className="logo" src={logo} alt="logo groupomania"></img>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/feed">
                Accueil{" "}
              </Link>
              <Link className="nav-link" to="/profile">
                {" "}
                Profile
              </Link>
              <Link className="nav-link" to="/login">
                {" "}
                Déconnexion
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default navbar;
