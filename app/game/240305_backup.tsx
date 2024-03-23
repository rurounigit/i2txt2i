"use client"

import React, { useState } from "react";

function Buildbutton({ onClick, clickvalue }) {
  return (
    <button className="border border-gray-800 leading-32 size-32 float-left text-center square text-5xl" onClick={onClick}>{clickvalue}</button>
  );
}

function Square({ number, squares, setSquares }) {
  const handleClick = (index) => {
    const newSquares = [...squares];
    newSquares[index] = "X";
    setSquares(newSquares);
  };

  return (
    <div className="table max-w-5xl border-0">
      {squares.map((clickvalue, index) => (
        <React.Fragment key={index}>
          <Buildbutton onClick={() => handleClick(index)} clickvalue={clickvalue} />
          {(index + 1) % number === 0 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Home() {
  const [number, setNumber] = useState(0);

  const [squares, setSquares] = useState(Array(number * number).fill(""));

  const [xIsNext, setXIsNext] = useState(true);

  const handleChange = (event) => {
    const newNumber = parseInt(event.target.value);
    setNumber(newNumber);
    const newSquares = Array(newNumber * newNumber).fill("");
    setSquares(newSquares);

  };
  

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-normal border-0 border-green-800">
        <h1 className="block text-base font-medium leading-6 text-gray-900 pt-20 pb-10">How many rows?</h1>
        <input type="number" className="w-10 mb-10 text-base" onChange={handleChange} value={number} />
        <Square number={number} squares={squares} setSquares={setSquares} />
      </main>
    </>
  );
}
