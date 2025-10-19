import React, { useState } from "react";
import Exercise1 from "./exercise1.jsx";
import { Context } from "./Context.js";
import CharCounter from './CharCounter.jsx'
export default function App() {
  const [Mode, setMode] = useState({
    backgroundColor: "white",
    color: "black",
    name: "Light Mode",
  });
  return (
     <>
        <Context.Provider value={{ Mode, setMode }}>
           <div style={{ height: "100vh", width: "1000vh", ...Mode }}>
              <Exercise1 />
           </div>
        </Context.Provider>
        <CharCounter />
     </>
  );
}
