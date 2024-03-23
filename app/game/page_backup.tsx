"use client"

import React, { useState } from "react";


function Buildbutton ({ onClick }) {
    const [clickvalue, setClickvalue] = useState("");

    function handleClick(event) {
        setClickvalue("X");
    }
    return (
      <button className="border border-gray-800 leading-32 size-32 float-left text-center square text-5xl" onClick={handleClick}>{clickvalue}</button>    
    );
}

function Square({number}) {
    const [clickvalue, setClickvalue] = useState(0);

    function handleClick(event) {
        setClickvalue("X");
    }
    
    return (
        <div className="table max-w-5xl border-0">
        {Array.from({ length: number*number }, (_, index) => (
          <React.Fragment key={index}>
            <Buildbutton onClick={handleClick} />
           {(index + 1) % number === 0 && <br />} 
          </React.Fragment>
        ))}
      </div>
    );
}    

export default function Home() {
  const [number, setNumber] = useState(0);
  const handleChange = (event) => {
    setNumber(event.target.value);
  };
  const [squares, setSquares] = useState(Array({number}).fill({number}));  

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-normal border-0 border-green-800">
        <h1 className="block text-base font-medium leading-6 text-gray-900 pt-20 pb-10">How many rows?</h1>
        <input type="number" className="w-10 mb-10 text-base" onChange={handleChange} value={number} />
        <Square number={number}/>
      </main>  
    </>
  );
}
