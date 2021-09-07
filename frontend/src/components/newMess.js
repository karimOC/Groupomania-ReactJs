import React from "react";
import "../styles/_newMess.scss";
import { Component } from "react";
import axios from "axios";

class newMess extends Component {
  state = {
    title: "",
    content: "",
    fileInput: React.createRef(),
    error: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFile = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  submitHandler = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    const data = new FormData();
    if (this.state.file !== "") {
      data.append("title", this.state.title);
      data.append("content", this.state.content);
      data.append("image", this.state.fileInput.current.files[0]);
    } else {
      data.append("title", this.state.title);
      data.append("content", this.state.content);
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
        this.setState({ error: JSON.stringify(error.response.data.error) });
      });
  };

  render() {
    const { title, content, fileInput, error } = this.state;
    return (
      <div className="toggle-new-mess">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#newMessToggle"
          aria-controls="newMessToggle"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-plus fa-lg"></i>
        </button>
        <div className="collapse navbar-collapse" id="newMessToggle">
          <div className="new-mess">
            <p>Nouvelle publication</p>
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
                  onChange={this.handleFile}
                  ref={fileInput}
                ></input>
              </div>
              <button type="submit" className="btn btn-danger">
                Partager
              </button>
              <div className="text-danger mt-3 text-center">{error}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default newMess;
