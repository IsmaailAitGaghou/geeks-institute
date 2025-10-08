import React, { useState } from 'react'

export default function Events() {
    let [isToggleOn,setToggleon]  = useState(true);
    const clickMe=()=>{
        alert('I was clicked');
    }
    function handleKeyDown(){
        alert('the enter key was clicked !')
    }
    function Togglebtn(){
        if(isToggleOn==true){
            setToggleon(false);
        }
        else{
             setToggleon(true);
        }
        
    }
    return (
    <div>
      <button onClick={clickMe}>clickMe</button>
      <input type='text' placeholder='press the enteer key' onKeyDown={handleKeyDown}/>
    <button onClick={Togglebtn}>{isToggleOn?"ON":"OFF"}</button>

    </div>
  )
}
