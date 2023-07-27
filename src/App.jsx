import { useState } from 'react'
import confetti from 'canvas-confetti';
import { Square } from '../components/Square.jsx';
import './App.css'
import { TURNS } from './constants.js';
import { WINNER_COMBOS } from './constants.js';
import { WinnerModal } from '../components/WinnerModal.jsx';
import ImagesComponent from '../components/ImgConponent.jsx';
import "./assets/x.png"

function App() {
  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem("board")
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  }) 
  const [turn, setTurn] = useState(() => {
  const turnFromStorage = window.localStorage.getItem('turn')
  return turnFromStorage ?? TURNS.X
  })
  //null no hay ganador false hay un empate
  const [winner, setWinner] = useState(null) 

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square)=> square !== null)
  }

  const updateBoard = (index) =>{
    if(board[index] || winner) return // verificar si la pocision es null
    //update board
    const newBoard = [...board]
    newBoard[index] = turn //x u o
    setBoard(newBoard)
    //change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // save game
    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", newTurn)

    // check if there is a winner 

    const newWinner = checkWinner(newBoard) 
      if(newWinner) {
       
        setWinner(newWinner)
      } else if (checkEndGame(newBoard)) {
        setWinner(false) // Draw
      }
  }

  return <main className='board'>
      <h1 className='game-title'>Juego de Gato</h1>
      <button className='reset-button' onClick={resetGame}>Reinicia el juego</button>
      {/* <section className='game'>
        {
          board.map(( square, index) => {
            return(
              <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}
              >{square}
              </Square>
            )
          })
        }
      </section> */}
      <section className="game">
        {board.map((square, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {/* Reemplazar las 'X' y 'O' con el componente ImagesComponent */}
            {square === TURNS.X && <ImagesComponent turn="X" />}
            {square === TURNS.O && <ImagesComponent turn="O" />}


          </Square>
        ))}
      </section>
      <section className='turn'>
        <Square isSelected = {turn === TURNS.X}>
        <ImagesComponent turn="X" />
         
          </Square>
        <Square  isSelected = {turn === TURNS.O}>
        <ImagesComponent turn="O" />
          </Square>
      </section>



 <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>

  </main>

}

export default App
