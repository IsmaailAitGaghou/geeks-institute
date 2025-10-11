import React from "react";

class UserForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         user: "",
         email: "",
      };
   }

   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   handleSubmit = async (e) => {
      e.preventDefault();
      const { user, email } = this.state;

      try {
         const response = await fetch(
            "https://jsonplaceholder.typicode.com/users",
            {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ user, email }),
            }
         );

         const result = await response.json();
         console.log("Data posted:", result);
      } catch (error) {
         console.error("Error:", error);
      }
   };

   render() {
      const { user, email } = this.state;

      return (
         <div className="App">
            <h2>Exercise 1: POST JSON Data</h2>
            <form onSubmit={this.handleSubmit}>
               <input
                  type="text"
                  name="user"
                  placeholder="User"
                  value={user}
                  onChange={this.handleChange}
               />
               <br />
               <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange}
               />
               <br />
               <button type="submit">Submit</button>
            </form>
         </div>
      );
   }
}

export default UserForm;
