import React from "react";

class UserFavoriteAnimals extends React.Component {
   render() {
      return (
         <div>
            <ul>
               {this.props.user.favAnimals.map((animal, index) => (
                  <li key={index}>{animal}</li>
               ))}
            </ul>
         </div>
      );
   }
}

export default UserFavoriteAnimals;
