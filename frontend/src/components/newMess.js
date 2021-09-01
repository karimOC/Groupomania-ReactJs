import React from "react";
import "../styles/_newMess.scss";
import { Component } from "react";
import axios from "axios";

class newMess extends Component {
  state = {
    title: "",
    content: "",
    file: null,
    error: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    const data = new FormData();
    if (this.file !== null) {
      data.append("title", this.title);
      data.append("content", this.content);
      data.append("image", this.file, this.file.name);
    } else {
      data.append("title", this.title);
      data.append("content", this.content);
    }

    axios
      .post("http://localhost:3000/api/messages/", data, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        alert("Votre message a bien été envoyé !");
        document.location.reload();
        window.location.href = "/feed";
      })
      .catch((error) => {
        this.error = error.response.data;
      });
  };

  render() {
    const { title, content, file, error } = this.state;
    return (
      <div className="new-mess">
        <form onSubmit={this.submitHandler}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              id="title"
              name="title"
              placeholder="Titre"
              value={title}
              onChange={this.changeHandler}
            ></input>
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="content"
              name="content"
              placeholder="Votre message..."
              value={content}
              onChange={this.changeHandler}
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="file"
              id="file"
              name="file"
              value={file}
              onChange={this.changeHandler}
            ></input>
          </div>
          <button type="submit" className="btn btn-danger btn-sm">
            Partager
          </button>
          <div className="text-danger mt-3">{error}</div>
        </form>
      </div>
    );
  }
}

export default newMess;
