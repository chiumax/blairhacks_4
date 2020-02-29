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
      targets: ".App",
      opacity: 0,
      duration: 0
    });
    anime({
      targets: ".App",
      opacity: 1,
      duration: 5000
    });
    anime({
      targets: ".logo",

      duration: "5000",
      keyframes: [
        {
          translateX: "50vw",
          translateY: "50vh",
          scale: "3"
        },
        {
          translateX: "50vw",
          translateY: "50vh",
          scale: "3"
        },
        {
          translateX: "50vw",
          translateY: "50vh",
          scale: "3"
        }
      ],
      direction: "reverse",
      easing: "easeInOutSine"
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
