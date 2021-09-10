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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img className="logo" src={logo} alt="logo groupomania"></img>
          <button
            className="navbar-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars fa-lg"></i>
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
              <p onClick={this.Logout} className="nav-link">
                {" "}
                Déconnexion
              </p>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default navbar;
