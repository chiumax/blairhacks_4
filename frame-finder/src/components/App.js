import anime from "animejs/lib/anime.es.js";

import React, { Component } from "react";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

//import logo from "./logo.svg";

class App extends Component {
  state = {
    searchDisplay: false
  };

  componentDidMount = () => {
    console.log("yeet ");

    anime({
      targets: ".contentWrapper ",
      direction: "reverse",
      keyframes: [
        { opacity: 0, translateY: 10 },
        { opacity: 0, translateY: 10 }
      ],
      duration: 6700
    });
    anime({
      targets: ".footerWrapper",
      direction: "reverse",
      keyframes: [
        { opacity: 0, translateY: 10 },
        { opacity: 0, translateY: 10 }
      ],
      duration: 6700
    });
    anime({
      targets: ".logo",
      opacity: 1,
      duration: "6000",
      keyframes: [
        {
          translateX: "43vw",
          translateY: "48vh",
          scale: "2",
          opacity: 1
        },
        {
          translateX: "43vw",
          translateY: "48vh",
          scale: "2",
          opacity: 1
        },
        {
          translateX: "43vw",
          translateY: "48vh",
          scale: "2",
          opacity: 1
        },
        {
          translateX: "43vw",
          translateY: "48vh",
          scale: "2",
          opacity: 1
        }
      ],
      direction: "reverse",
      easing: "easeInOutSine"
    });
    anime({
      targets: ".logoText",

      duration: "5700",
      keyframes: [
        {
          translateX: "39.5vw",
          translateY: "38vh",
          scale: "3"
        },
        {
          translateX: "39.5vw",
          translateY: "38vh",
          scale: "3"
        },
        {
          translateX: "39.5vw",
          translateY: "38vh",
          scale: "3"
        },
        {
          translateX: "39.5vw",
          translateY: "38vh",
          scale: "3"
        }
      ],
      direction: "reverse",
      easing: "easeInOutSine",
      complete: () => {
        this.animateFadeIn();
      }
    });
    anime({
      targets: ".lds-ellipsis",
      duration: "6500",
      keyframes: [
        {
          opacity: 0,
          translateX: "35vw",
          translateY: "60vh",
          scale: "1.3"
        },
        {
          translateX: "35vw",
          translateY: "60vh",
          scale: "1.3",
          opacity: 1
        },
        {
          translateX: "35vw",
          translateY: "60vh",
          scale: "1.3",
          opacity: 1
        },
        {
          translateX: "35vw",
          translateY: "60vh",
          scale: "1.3",
          opacity: 1
        }
      ],
      direction: "reverse",
      easing: "easeInOutSine"
    });
  };
  animateFadeIn = () => {
    anime({
      easing: "easeInOutSine",
      targets: ".bottomBorder",
      translateY: "-1rem",
      opacity: 1
    });
  };
  onToggleSearch = () => {
    this.setState(prevState => ({
      searchDisplay: !prevState.searchDisplay
    }));
  };

  render() {
    return (
      <div className="App">
        <div className="headerWrapper">
          <Header />
        </div>
        <div className="contentWrapper">
          <Content />
        </div>
        <div className="footerWrapper">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
