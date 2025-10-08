import React from "react";
import "./Exercise.css"

class Exercise3 extends React.Component {
    
   render() {
    const style_header = {
       color: "white",
       backgroundColor: "DodgerBlue",
       padding: "10px",
       fontFamily: "Arial",
    };
      return (
        <div>
            <h1 style={style_header}>This is a header</h1>
            <p className="para">This is a paragraph.</p>
            <a href="https://www.example.com">This is a link</a>
            <form action="https://www.example.com">
               <input type="text" placeholder="Type something..." />
               <button type="submit">Submit</button>
            </form>
            <h1>here is an image</h1>
            <img src="https://www.example.com/image.jpg" alt="Example" />
            <ul>
               <li>Coffee</li>
               <li>Tea</li>
               <li>Juice</li>
            </ul>
        </div>
      );
   }
}

export default Exercise3;
