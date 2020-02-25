import React from "react";
import Router from "./config/router";
import NavBar from "./components/navbar";

class App extends React.Component {
  render() {
    return (
      <div className="content">
        <NavBar />
        <Router />
      </div>
    );
  }
}

export default App;
