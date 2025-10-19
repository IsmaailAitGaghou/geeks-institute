// src/UsersList.js
import React from "react";
import "./List.css";
class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loaded: false,
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data, loaded: true });
      })
      .catch((error) => {
        this.setState({ loaded: true });
        console.error("Error fetching users:", error);
      });
  }

  render() {
    const { users, loaded } = this.state;

    if (!loaded) {
      return <div className="loading">⏳ Loading users...</div>;
    }

    return (
      <div className="list-container">
        <h2>👥 Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="card">
              <strong>{user.name}</strong>
              <br />
              <span>{user.email}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UsersList;
