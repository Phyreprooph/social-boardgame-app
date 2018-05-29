import React, { Component } from "react"

import bgglogo from "./bgg-icon.svg"
import "./Start.css"
import { Button, Icon } from "semantic-ui-react"

const FacebookButton = ({ text, onClick }) => (
  <div>
    <Button icon labelPosition="left" size="big" color="facebook">
      <Icon name="facebook" />
      {text}
    </Button>
  </div>
)

const GoogleButton = ({ text, onClick }) => (
  <div>
    <Button icon labelPosition="left" size="big" color="google plus">
      <Icon name="google" />
      {text}
    </Button>
  </div>
)

const BGGButton = ({ text, onClick }) => (
  <div>
    <Button icon labelPosition="left" size="big" color="orange">
      <Icon>
        <img src={bgglogo} alt="boardgamegeek" className="google icon" />
      </Icon>
      {text}
    </Button>
  </div>
)

class Start extends Component {
  render() {
    return (
      <div>
        <FacebookButton text="Login with Facebook" />
        <GoogleButton text="Login with Google" />
        <BGGButton text="Login with BoardGameGeek" />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export { Start }
