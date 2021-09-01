import React from "react";
import { Component } from "react";
import AllMess from "./allMess";
import NewMess from "./newMess";
import Navbar from "./navbar";
import Footer from "./footer";

class feed extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <NewMess />
        <AllMess />
        <Footer />
      </div>
    );
  }
}

export default feed;
