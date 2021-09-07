import React from "react";
import "../styles/_newComm.scss";
import { Component } from "react";
import axios from "axios";

class newComm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      error: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendComment = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:3000/api/messages/" + this.props.idMess + "/comment/",
        this.state,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(() => {
        alert("Votre commentaire a bien été envoyé !");
        document.location.reload()
      })
      .catch((error) => {
        this.setState({ error: JSON.stringify(error.response.data.error) });
      });
  };

  render() {
    const { comment, error } = this.state;
    return (
      <div className="new-comm">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i className="far fa-comment"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Ajouter un commentaire..."
            id="comment"
            name="comment"
            value={comment}
            onChange={this.changeHandler}
          ></input>
          <div className="input-group-prepend">
            <button
              type="button"
              onClick={this.sendComment}
              className="input-group-text"
              id="basic-addon2"
            >
              Publier
            </button>
          </div>
        </div>
        <div className="text-danger mt-3 text-center">{error}</div>
      </div>
    );
  }
}

export default newComm;
