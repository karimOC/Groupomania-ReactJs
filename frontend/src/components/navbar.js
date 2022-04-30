import React from "react";
import "../styles/_navbar.scss";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Component } from "react";

class navbar extends Component {
  Logout() {
    if (window.confirm("Voulez-vous vous déconnecter ?")) {
      localStorage.clear();
      window.location.href = "/login";
    }
  }

  render() {
    return (
      // <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //   <div className="container-fluid">
      //     <img className="logo" src={logo} alt="logo groupomania"></img>
      //     <button
      //       className="navbar-button"
      //       type="button"
      //       data-bs-toggle="collapse"
      //       data-bs-target="#navbarNavAltMarkup"
      //       aria-controls="navbarNavAltMarkup"
      //       aria-expanded="false"
      //       aria-label="Toggle navigation"
      //     >
      //       <i className="fas fa-bars fa-lg"></i>
      //     </button>
      //     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      //       <div className="navbar-nav">
      //         <Link className="nav-link" to="/feed">
      //           Accueil{" "}
      //         </Link>
      //         <Link className="nav-link" to="/profile">
      //           {" "}
      //           Profile
      //         </Link>
      //         <p onClick={this.Logout} className="nav-link">
      //           {" "}
      //           Déconnexion
      //         </p>
      //       </div>
      //     </div>
      //   </div>
      // </nav>
      <div>
        <nav className="flex justify-between">
          <img className="logo" src={logo} alt="logo groupomania"></img>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/feed">
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <p onClick={this.Logout} className="nav-link">
                Déconnexion
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default navbar;
