import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('/api/users').then(res => setUsers(res.data))
  }, [])

  return (
    <div>
      <ul>
        {users.map(user => {
          return (
            <li key={user.id}>
              {user.email} {user.userName}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Users
