import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from './NotFound'
import Home from './Home'
import Users from './Users'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
