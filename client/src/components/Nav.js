import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" class="navbar-brand">
        Forum
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link to="/users" class="nav-link">
              Users
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/about" class="nav-link">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
