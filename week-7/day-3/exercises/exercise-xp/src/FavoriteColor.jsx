import React, { Component } from "react";

export default class FavoriteColor extends Component {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 2000);
  }
  shouldComponentUpdate() {
    console.log("In shouldComponentUpdate");
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return null;
  }
  componentDidUpdate() {
    console.log("after update");
  }
  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
  };

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h2>My favorite color is {this.state.favoriteColor}</h2>
        <button onClick={this.changeColor}>Change color to blue</button>
      </div>
    );
  }
}
