import React from "react";
import PostList from "./PostList";
import UsersList from "./UsersList";
function App() {
  return (
    <div className="App">
      <h1>Fetch Data from API</h1>
      <UsersList />
      <PostList />
    </div>
  );
}

export default App;
