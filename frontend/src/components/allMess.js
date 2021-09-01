import React from "react";
import "../styles/_allMess.scss";
import { Link } from "react-router-dom";
import { Component } from "react";
import DeleteMess from "./deleteMess";
import axios from "axios";
let jwt = require("jsonwebtoken");

class allMess extends Component {
  state = {
    token: "",
    userId: localStorage.getItem("id"),
    isAdmin: false,
    allMessages: [],
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    let decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    axios
      .get("http://localhost:3000/api/messages/", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        this.setState({ allMessages: res.data });
        this.setState({ isAdmin: decodedToken.isAdmin });
      })
      .catch((error) => {
        console.log({ error });
      });
  }
  render() {
    const { allMessages, userId, isAdmin } = this.state;

    return (
      <div className="feed">
        {allMessages.map((message) => (
          <div className="card" key={message.id}>
            <div className="card-username">
              <div>
                <b>
                  <i className="far fa-user"></i>
                  {message.User.name} {message.User.firstname}
                </b>
              </div>
              <div>
                {message.idUsers === parseInt(userId) || isAdmin === true ? (
                  <DeleteMess idMess={message.id} />
                ) : null}
              </div>
            </div>
            {message.image ? (
              <Link to={`/oneMess/${message.id}`}>
                <img
                  className="card-img-top"
                  src={message.image}
                  alt={message.title}
                ></img>
              </Link>
            ) : null}
            <div className="card-body">
              <div className="like-comment">
                <a href="/feed">
                  <i
                    className="far fa-heart fa-lg"
                    style={{ color: "#dc3545" }}
                  ></i>
                </a>
                <Link to={`/oneMess/${message.id}`}>
                  <i
                    className="fas fa-comment-dots fa-lg"
                    style={{ color: "#dc3545" }}
                  ></i>
                </Link>
                {/* <i
                  className="fas fa-ellipsis-h fa-lg"
                  style={{ color: "#dc3545" }}
                ></i> */}
              </div>

              <h4 className="card-title">
                <b>{message.title}</b>
              </h4>
              <p className="card-text">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default allMess;
