import './App.css'
import { useReducer } from 'react'
import DigitButton from './components/DigitButton.jsx'
import OperationButton from './components/OperationButton.jsx'
import { reducer } from './components/reducer'
import { formatOperand } from './components/format'
import { ACTIONS } from './components/Actions'

export function evaluate({ current, previous, operation }) {
 const curr = parseFloat(current)
 const prev = parseFloat(previous)
 if (isNaN(prev) || isNaN(curr)) return ''
 let computation = ''
 switch (operation) {
   case '+':
     computation = prev + curr
     break
   case '-':
     computation = prev - curr
     break
   case '*':
     computation = prev * curr
     break
   case '÷':
     computation = prev / curr
     break
 }
 return computation.toString()
}



function App() {
  const [{ current, previous, operation }, dispatch] = useReducer(reducer, {})
  return (
    <div className='container' >
    <div className='text__container'>
      <h3>CASE UI</h3>
      <h1>CALCULADORA</h1>
      <p>Calculadora web con funciones matematicas basicas: adición, sustracción, multiplicación y división. </p>
    </div>
    <div className="calculadora__container">
      <div className="calculadora__output">
        <div className="calculadora output__previous">{formatOperand(previous)}{operation}</div>
        <div className="calculadora output__current">{formatOperand(current)}</div>
      </div>
      <button className='span__two' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationButton operation='÷' dispatch={dispatch} />
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />
      <OperationButton operation='*' dispatch={dispatch} />
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />
      <OperationButton operation='+' dispatch={dispatch} />
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      <OperationButton operation='-' dispatch={dispatch} />
      <DigitButton digit='.' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} />
      <button className='span__two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
    </div>
  )
}

export default App
