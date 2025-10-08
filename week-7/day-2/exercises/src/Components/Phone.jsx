import React, {useState}from 'react'

export default function Phone() {
     const [car, setCar] = useState({
    brand: "Samsung",
    model: "Galaxy S20",
    color: "black",
    year: 2020
  });
   function changeColor (){
    setCar(prevCar=>({...prevCar,color: 'blue'}));
   }

  return (
    <div>
      <p> details:{car.brand} {car.model} {car.color} {car.year}</p>
      <button onClick={changeColor}>click to change color to blue </button>
    </div>
  )
}
