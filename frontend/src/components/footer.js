import React from "react";
import "../styles/_footer.scss";
import { Component } from "react";

class footer extends Component {
  render() {
    return (
      <footer>
        <div>
          <ul className="menu">
            <li>
              <a href="/feed">À propos</a>
            </li>
            <li>
              <a href="/feed">Aide</a>
            </li>
            <li>
              <a href="/feed">Conditions</a>
            </li>
            <li>
              <a href="/feed">Emplois</a>
            </li>
          </ul>
        </div>
        <div className="mb-5"><center>© 2021 Groupomania par EL FAKIH Karim</center></div>
      </footer>
    );
  }
}

export default footer;
