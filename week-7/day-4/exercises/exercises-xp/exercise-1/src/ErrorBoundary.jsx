import React, { Component } from "react";

export default class ErrorBoundary extends Component {
   constructor(props) {
      super(props);
      this.state = {  hasError: false };
   }
   componentDidCatch(error, errorInfo) {
      this.setState({ hasError: true });
      console.log(error, errorInfo);
      
   }
   render() {
      if (this.state.hasError) {
         return (
            <div className="p-4 bg-red-100 text-red-700 border border-red-400 rounded">
               <h2>Something went wrong 😢</h2>
                <p>Please try again later.</p>
            </div>
         );
      }
      return this.props.children;
   }
}
