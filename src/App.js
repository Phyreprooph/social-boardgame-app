import React from "react"

import { BrowserRouter as Router, Route } from "react-router-dom"

import { Start } from "Start"
import { Lookup } from "Lookup"

// import semantic at root
import "semantic-ui-css/semantic.min.css"

const App = () => (
  <Router>
    <div className="App">
      <Route exact path="/" component={Start} />
      <Route exact path="/lookup" component={Lookup} />
    </div>
  </Router>
)

export default App
