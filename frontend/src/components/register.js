import React from "react";
import "../styles/_register.scss";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Component } from "react";
import axios from "axios";

class register extends Component {
  state = {
    email: "",
    name: "",
    firstname: "",
    password: "",
    error: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/signup", this.state)
      .then((res) => {
        console.log(res);
        window.location.href = "/login";
      })
      .catch((error) => {
        this.setState({ error: JSON.stringify(error.response.data.error) });
        console.log(error.response.data);
        console.log(this.state);
      });
  };

  render() {
    const { email, name, firstname, password, error } = this.state;
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
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Nom"
              value={name}
              onChange={this.changeHandler}
            ></input>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              placeholder="Prénom"
              value={firstname}
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
            Inscription
          </button>
          <div
            className="text-danger mt-3"
          >
            {error}
          </div>
        </form>
        <div className="btn-inscr">
          Vous avez déjà un compte ?<Link to="/login"> Je me connecte</Link>
        </div>
      </div>
    );
  }
}

export default register;
