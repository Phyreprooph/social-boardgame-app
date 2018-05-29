import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import bgglogo from './bgg-icon.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Image, Button, Icon } from 'semantic-ui-react';

const FacebookButton = ({ text, onClick }) => (
  <div>
    <Button icon labelPosition="left" size="big" color="facebook">
      <Icon name="facebook" />
      {text}
    </Button>
  </div>
);

const GoogleButton = ({ text, onClick }) => (
  <div>
    <Button icon labelPosition="left" size="big" color="google plus">
      <Icon name="google" />
      {text}
    </Button>
  </div>
);

const BGGButton = ({ text, onClick }) => (
  <div>
    <Button icon labelPosition="left" size="big" color="orange">
      <Icon>
        <img src={bgglogo} className="google icon" />
      </Icon>
      {text}
    </Button>
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Image className="App-logo" src={logo} alt="logo" centered />
          <h1 className="App-title">Welcome to React</h1>
        </div>
        <FacebookButton text="Login with Facebook" />
        <GoogleButton text="Login with Google" />
        <BGGButton text="Login with BoardGameGeek" />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
