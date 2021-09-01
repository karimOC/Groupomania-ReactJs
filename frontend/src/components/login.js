import React from "react";
import "../styles/_login.scss";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Component } from "react";
import axios from "axios";

class login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/login", this.state)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.userId);
        window.location.href = "/feed";
      })
      .catch((error) => {
        // this.setState({ [error]: error.response.data });
        this.setState({ error: JSON.stringify(error.response.data.error) });
        console.log(error.response.data);
      });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="body-register">
        <form onSubmit={this.submitHandler} className="form-register">
          <img className="logo" src={logo} alt="logo groupomania"></img>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.changeHandler}
            ></input>
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={this.changeHandler}
            ></input>
          </div>
          <button type="submit" className="btn-connect">
            Connection
          </button>
          <div className="text-danger mt-3">{error}</div>
        </form>
        <div className="btn-inscr">
          Vous n’avez pas de compte ?<Link to="/register"> Je m'inscris</Link>
        </div>
      </div>
    );
  }
}

export default login;
