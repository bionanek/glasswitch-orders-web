import React from "react";
import logo from '../../logo.svg';

const Home = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello <strong>Glass Witch</strong>! <br />
          Let's start <strong>CODING</strong>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
                </a>
      </header>
    </div>
  );
};

export default Home;