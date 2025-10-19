import React, { useRef, useState, useEffect } from "react";

export default function CharCounter() {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const inputEl = inputRef.current;
    const handleInput = () => {
      setCount(inputEl.value.length);
    };
    inputEl.addEventListener("input", handleInput);
    return () => {
      inputEl.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Tapez quelque chose..."
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <p>Nombre de caractères : {count}</p>
    </div>
  );
}
