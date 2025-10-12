import "./App.css";
import { useState } from "react";

function App() {
   const [firstNumber, setFirstNumber] = useState(0);
   const [secondNumber, setSecondNumber] = useState(0);
   const [result, setResult] = useState(null);
    const [operation, setOperation] = useState("add");

   const addNumbers = () => {
    switch (operation) {
      case 'add':
        setResult(firstNumber + secondNumber);
        break;
      case 'subtract':
        setResult(firstNumber - secondNumber);
        break;
      case 'multiply':
        setResult(firstNumber * secondNumber);
        break;
      case 'divide':
        if (secondNumber !== 0) {
          setResult(firstNumber / secondNumber);
        } else {
          setResult('Error: Division by zero');
        }
        break;
      default:
        setResult('Invalid operation');
    }
      // setResult(firstNumber + secondNumber);
   };

   return (
      <>
         <div className="App">
            <h1>Adding two numbers</h1>
            <input
               type="number"
               value={firstNumber}
               onChange={(e) => setFirstNumber(Number(e.target.value))}
               placeholder="First Number"
            />
            <input
               type="number"
               value={secondNumber}
               onChange={(e) => setSecondNumber(Number(e.target.value))}
               placeholder="Second Number"
            />
            <select name="operation" onChange={(e) => setOperation(e.target.value)}>
               <option value="add">Add</option>
               <option value="subtract">Subtract</option>
               <option value="multiply">Multiply</option>
               <option value="divide">Divide</option>
            </select>
            <button onClick={addNumbers}>Add Them!</button>
            <h2>Result: {result}</h2>
         </div>
      </>
   );
}

export default App;
