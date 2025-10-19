import React from "react";
import "./List.css"; 
class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ posts: data });
      })
      .catch((error) => {
        this.setState({ errorMsg: "Error fetching posts" });
      });
  }

  render() {
    const { posts, errorMsg } = this.state;

    return (
      <div className="list-container">
        <h2>📬 Posts</h2>
        {posts.length ? (
          posts.slice(0, 10).map((post) => (
            <div key={post.id} className="card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))
        ) : (
          <p>{errorMsg ? errorMsg : "Loading posts..."}</p>
        )}
      </div>
    );
  }
}

export default PostList;
