import React, { Component } from "react";
import logo from "./abc_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import Content from "./Content.json";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class MainPage extends Component {
  state = {
    render: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      currentPage: 0,
      headline: "",
      subhead: "",
      cta: "",
      backgroundUrl: "",
    };
  }
  changePage(num) {
    let oldPage = this.state.currentPage;
    var data = Content["pages"][num]["blocks"][0];

    let imgUrl = process.env.PUBLIC_URL + "/backgrounds/" + data["background"];

    this.setState({
      currentPage: num,
      headline: data["headline"],
      subhead: data["subhead"],
      cta: data["cta"],
      backgroundUrl: imgUrl,
    });

    document
      .getElementsByClassName("menu-item")
      [oldPage].classList.remove("focused");
    document.getElementsByClassName("menu-item")[num].classList.add("focused");
  }

  componentWillMount = () => {
    var data = Content["pages"][0]["blocks"][0];
    let imgUrl = process.env.PUBLIC_URL + "/backgrounds/" + data["background"];
    this.setState({
      isLoading: false,
      currentPage: 0,
      headline: data["headline"],
      subhead: data["subhead"],
      cta: data["cta"],
      backgroundUrl: imgUrl,
    });
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <div style={{ alignItems: "center", display: "flex", justifyContent: "center", height: "100vh", width: "100vw" }}>
          <CircularProgress size = {150} style = {{color: "grey"}}/>
        </div>
      );
    } else {
      return (
        <div
          className="main"
          id="main"
          style={{ backgroundImage: "url(" + this.state.backgroundUrl + ")" }}
        >
          <div className="header">
            <div className="left-section">
              <img id="logo" src={logo} alt=""></img>
              <div className="menu">
                <button
                  className="menu-item focused"
                  onClick={() => this.changePage(0)}
                >
                  Industries
                </button>
                <button
                  className="menu-item"
                  onClick={() => this.changePage(1)}
                >
                  Services
                </button>
                <button
                  className="menu-item"
                  onClick={() => this.changePage(2)}
                >
                  About Us
                </button>
              </div>
            </div>
            <div className="right-section">
              <button id="contact">Contact Us</button>
            </div>
          </div>
          <div className="page">
            <h1 id="headline">{this.state.headline}</h1>
            <p id="content">{this.state.subhead}</p>
          </div>
          <footer>
            <h1 id="cta">{this.state.cta}</h1>
            <p id="footer-content">
              {" "}
              LET'S TALK.
              <FontAwesomeIcon id="footer-icon" icon={faLongArrowAltRight} />
            </p>
          </footer>
        </div>
      );
    }
  }
}
