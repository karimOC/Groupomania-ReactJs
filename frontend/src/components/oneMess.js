import React from "react";
import { Component } from "react";
import Navbar from "./navbar";
import DeleteComm from "./deleteComm";
import Footer from "./footer";
import NewComm from "./newComm";
import "../styles/_oneMess.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import "moment/locale/fr";
let jwt = require("jsonwebtoken");
let moment = require("moment");

class oneMess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      userId: localStorage.getItem("id"),
      isAdmin: false,
      allComments: [],
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    let decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

    axios
      .get(
        "http://localhost:3000/api/messages/" +
          this.props.match.params.id +
          "/comments/",
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        this.setState({ allComments: res.data });
        this.setState({ isAdmin: decodedToken.isAdmin });
      })
      .catch((error) => {
        console.log({ error });
      });
  }
  render() {
    const { allComments, userId, isAdmin } = this.state;

    if (allComments.length === 0) {
      return (
        <div>
          <Navbar />
          <div className="jumbotron">
            <Link className="retour" to="/feed">
              <i className="fas fa-angle-left fa-lg"></i>retour
            </Link>
            <h3 className="display-4 mt-3">Aucun commentaire !</h3>
            <hr className="my-1 mb-3"></hr>
          </div>
          <NewComm idMess={this.props.match.params.id} />
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <div className="jumbotron">
            <Link className="retour" to="/feed">
              <i className="fas fa-angle-left fa-lg"></i>retour
            </Link>
            <h3 className="display-4 mt-3">Commentaires</h3>
            <hr className="my-1 mb-3"></hr>
            {allComments.map((comment) => (
              <div className="lead mb-2" key={comment.id}>
                <div className="nom-prenom">
                  <b>
                    {comment.User.name} {comment.User.firstname}{" "}
                  </b>
                </div>
                <div className="content">{comment.comment}</div>
                <div className="date">
                  {moment(comment.createdAt).fromNow()}
                </div>
                {comment.idUsers === parseInt(userId) || isAdmin === true ? (
                  <DeleteComm
                    idComm={comment.id}
                    idParams={this.props.match.params.id}
                  />
                ) : null}
              </div>
            ))}
            <hr className="my-3"></hr>
          </div>
          <NewComm idMess={this.props.match.params.id} />
          <Footer />
        </div>
      );
    }
  }
}

export default oneMess;
