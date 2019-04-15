import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from './NotFound'
import Nav from './Nav'
import Home from './Home'
import Users from './Users'
import About from './About'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/about" component={About} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default App
