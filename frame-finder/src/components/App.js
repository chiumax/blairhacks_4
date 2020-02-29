import React from "react";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

//import logo from "./logo.svg";

function App() {
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

export default App;
