import  { useState } from 'react'
import Garage from './Garage.jsx'

export default function Car(props) {
  const color=useState('Red');
  return (
    <div>
    <h1> This car is  {color} {props.carinfo.model}.</h1> 
    <Garage size="small" /> 
    </div>
  )
}
