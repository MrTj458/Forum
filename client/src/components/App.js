import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Users from './Users'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
      </Switch>
    )
  }
}

export default App
