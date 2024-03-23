"use client"

import React, { useState } from "react";

export default function Home() {
  const [number, setNumber] = useState<number>(3);
  const [squares, setSquares] = useState<string[]>(Array(number * number).fill(""));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-normal border-0 border-green-800">
        <h1 className="block text-base font-medium text-3xl leading-6 text-gray-900 pt-6 pb-0">3 Wins</h1>
        <h1 className="block text-base font-medium leading-6 text-gray-900 pt-10 pb-10">How many rows?</h1>
        <Input number={number} setNumber={setNumber} setSquares={setSquares}/>
        <Square number={number} squares={squares} xIsNext={xIsNext} setXIsNext={setXIsNext} setSquares={setSquares}/>
        <h1 className="block text-base font-medium leading-6 text-gray-900 pt-10 pb-10">{status}</h1>
      </main>
    </>
  );
}

function Input({number, setNumber, setSquares}) {
  const handleChange = (event) => {
    const newNumber = parseInt(event.target.value);
    setNumber(newNumber);
    const newSquares = Array(newNumber * newNumber).fill("");
    setSquares(newSquares);   
    };

  return (
   <input type="number" value={number} min={3} max={5} className="w-10 mb-10 text-base" onChange={handleChange}/>
  )

}

function Square({ number, squares, setSquares, xIsNext, setXIsNext }) {
  const handleClick = (index: number) => {

    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    const newSquares = [...squares];
    if (xIsNext) {
      newSquares[index] = "X";
    } else {
      newSquares[index] = "O";
    }
    setSquares(newSquares);
    setXIsNext(!xIsNext);

  };

  return (
    <div className="table max-w-5xl border-0">
      {squares.map((clickvalue, index) => (
        <React.Fragment key={index}>
          <button className="border border-gray-800 leading-32 size-32 float-left text-center square text-5xl" onClick={() => handleClick(index)}>{clickvalue}</button>
          {(index + 1) % number === 0 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
}

function calculateWinner(squares: string[]): string {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
