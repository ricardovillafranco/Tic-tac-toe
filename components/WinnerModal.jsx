import { Square } from "./Square"
import ImagesComponent from "./ImgConponent";
export function WinnerModal ({winner, resetGame})  {
    if(winner === null) return null

    const winnerText = winner === false ? "Empate" : "Ganó:"
    return (    <section className='winner'>
    <div className='text'>
      <h2>{winnerText}</h2>
      <header className='win'>
      {winner && <Square>{ winner === "X"  ? <ImagesComponent turn="X" /> : <ImagesComponent turn="O" /> }</Square>}
      </header>
      <footer>
        <button onClick={resetGame}>Empezar de nuevo</button>
      </footer>
    </div>
  </section>
)
    
       
      
      
}