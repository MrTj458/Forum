import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  state = { users: [] };

  componentDidMount() {
    axios.get("/api/users").then(data => this.setState({ users: data.data }));
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.users.map(user => {
            return (
              <li key={user.id}>
                {user.email} {user.userName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Users;
