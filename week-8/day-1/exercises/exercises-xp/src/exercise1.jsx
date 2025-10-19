import React, { useContext } from "react";
import { Context } from "./Context.js";
export default function Exercise1() {
   const { Mode, setMode } = useContext(Context);
   function handleClick(e) {
      e.preventDefault();
      if (Mode.backgroundColor === "white") {
         setMode({
            backgroundColor: "black",
            color: "white",
            name: "Dark Mode",
         });
      } else {
         setMode({
            backgroundColor: "white",
            color: "black",
            name: "Light Mode",
         });
      }
   }
   return (
      <div style={Mode}>
         <button onClick={handleClick}>{Mode.name}</button>
      </div>
   );
}
