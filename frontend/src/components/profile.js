import React from "react";
import "../styles/_profile.scss";
import Navbar from "./navbar";
import Footer from "./footer";
import { Component } from "react";
// import { Link } from "react-router-dom";
import DeleteMess from "./deleteMess";
import axios from "axios";
import "moment/locale/fr";
let moment = require("moment");

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("id"),
      isAdmin: false,
      allMessagesProfile: [],
      dataProfile: [],
      name: "",
      firstname: "",
      error: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loadProfile() {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("id");
    axios
      .get("http://localhost:3000/api/auth/profile/" + userId, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        this.setState({ dataProfile: res.data });
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  submitUpdate = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("id");
    const data = {
      name: this.state.name,
      firstname: this.state.firstname,
    };
    axios
      .put("http://localhost:3000/api/auth/profile/" + userId, data, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        alert("Votre profil a bien été mis à jour !");
        document.location.reload();
      })
      .catch((error) => {
        this.setState({ error: JSON.stringify(error.response.data.error) });
      });
  };

  deleteProfile() {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("id");
    axios
      .delete("http://localhost:3000/api/auth/profile/" + userId, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        alert("Votre compte a bien été supprimé !");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  componentDidMount() {
    this.loadProfile();
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("id");
    axios
      .get("http://localhost:3000/api/auth/profile/" + userId + "/messages", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        this.setState({ allMessagesProfile: res.data });
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  render() {
    const {
      userId,
      isAdmin,
      allMessagesProfile,
      dataProfile,
      name,
      firstname,
      error,
    } = this.state;

    return (
      <div>
        <Navbar />
        <div className="profile">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed btn btn-danger"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Mon profil
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <form onSubmit={this.submitUpdate} className="form-register">
                    <div className="mb-3">
                      <div className="alert alert-secondary" role="alert">
                        {dataProfile.name}
                      </div>
                      <div className="alert alert-secondary" role="alert">
                        {dataProfile.firstname}
                      </div>
                      <div className="alert alert-secondary" role="alert">
                        {dataProfile.email}
                      </div>
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
                    <button type="submit" className="btn btn-secondary">
                      Modifier
                    </button>
                    <div className="text-danger mt-3">{error}</div>
                  </form>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button
                  className="accordion-button collapsed btn btn-danger"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Mes publications
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {allMessagesProfile.map((message) => (
                    <div className="card" key={message.id}>
                      <img
                        src={message.image}
                        className="card-img-top"
                        alt={message.title}
                      ></img>
                      <div className="delete-message">
                        <b className="card-text m-2">{message.title}</b>
                        {message.idUsers === parseInt(userId) ||
                        isAdmin === true ? (
                          <DeleteMess idMess={message.id} />
                        ) : null}
                      </div>
                      <p className="date m-2">
                        {moment(message.createdAt).fromNow()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button
                  className="accordion-button collapsed btn btn-danger"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Supprimer mon compte
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingThree"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Je supprime mon compte
                  </button>

                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">
                            <i className="fas fa-user-times"></i> Supprimer mon
                            compte
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p>
                            Voulez-vous vraiment supprimer votre compte
                            définitivement ?
                          </p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Annuler
                          </button>
                          <button
                            type="button"
                            onClick={this.deleteProfile}
                            className="btn btn-danger"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default profile;
