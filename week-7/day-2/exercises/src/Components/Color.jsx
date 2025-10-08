import React,{useEffect}from 'react'

export default function Color() {
    const favoriteColor ="red";
    useEffect(()=>{
        alert("useEffect reached");
    },[]);
  return (
    <div>
      <h1>my fav color is {favoriteColor}</h1>
    </div>
  )
}
