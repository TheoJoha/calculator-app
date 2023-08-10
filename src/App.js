// The calculator uses formula logic

import './App.css';
import {useState, useEffect} from 'react'

function App() {
  const [output, setOutput] = useState('0')
  const [input, setInput] = useState('0')
  const [clickedEqual, setClickedEqual] = useState('')
  const [lastButtonWasEqual, setLastButtonWasEqual] = useState(false)

  const Reset = () => {
    setOutput('0')
    setInput('0')
    setClickedEqual(false)
    setLastButtonWasEqual(false)
  }

  const NewChar = (e) => {
    let newChar = e.target.value
    
    // Possible improvements:
    // check re scientific notation
    // maybe add something regarding error when dividing with 0, AC maybe has to be clicked
    // Scientific calculator extension
    // Mobile version

    
    // update input-string
    setInput(input => {
      // if last button clicked was equal
      if (lastButtonWasEqual && ((newChar >= 0 && newChar <= 9) || newChar === '.')) {
        setLastButtonWasEqual(false)
        return newChar
      }
      // if length of input is 14 chars or more
      if (input.length >= 14) {
        setLastButtonWasEqual(false)
        return input
      }
      console.log(input)
      setClickedEqual(false)
      // if inputted zero and first char is zero
      if (input[0] === '0' && newChar === '0') {
        setLastButtonWasEqual(false)
        return '0'
      }
      // if inputted decimal and last char is decimal
      if (newChar === '.' && input[input.length - 1] === '.') {
        setLastButtonWasEqual(false)
        return input
      }
      // if first char is zero
      if ((input.length === 1 || input === 0) && (input[0] === '0' || input === 0) && (newChar === '0' ||
      newChar === '1' ||
      newChar === '2' ||
      newChar === '3' ||
      newChar === '4' ||
      newChar === '5' ||
      newChar === '6' ||
      newChar === '7' ||
      newChar === '8' ||
      newChar === '9')) {
        setLastButtonWasEqual(false)
        return newChar
      }
      // special cases if most recent char is a minus
      if (input[input.length - 1] === '-' && input.length >= 2) {
        if (input[input.length - 2] === '+' || input[input.length - 2] === '/' || input[input.length - 2] === '*') {
          if (newChar === '+') {
            setLastButtonWasEqual(false)
            return input.slice(0, input.length - 2) + '+'
          }
          if (newChar === '*') {
            setLastButtonWasEqual(false)
            return input.slice(0, input.length - 2) + '*'
          }
          if (newChar === '/') {
            setLastButtonWasEqual(false)
            return input.slice(0, input.length - 2) + '/'
          }
        }
        if (newChar === '+') {
          setLastButtonWasEqual(false)
          return input.slice(0, input.length - 1) + '+'
        }
        if (newChar === '*') {
          setLastButtonWasEqual(false)
          return input.slice(0, input.length - 1) + '*'
        }
        if (newChar === '/') {
          setLastButtonWasEqual(false)
          return input.slice(0, input.length - 1) + '/'
        }
      }
      if (newChar === '+') {
        if (input[input.length - 1] === '+') {
          setLastButtonWasEqual(false)
          return input
        }
        if (input[input.length - 1] === '*') {
          setLastButtonWasEqual(false)
          return input.slice(0,input.length - 1) + '+'
        }
        if (input[input.length - 1] === '/') {
          setLastButtonWasEqual(false)
          return input.slice(0,input.length - 1) + '+'
        }
        if (input[input.length - 1] === '-') {
          setLastButtonWasEqual(false)
          return input.slice(0,input.length - 1) + '+'
        }
      } 
      if (newChar === '-') {
        if (input[input.length - 1] === '-') {
          setLastButtonWasEqual(false)
          return input
        }
        if (input[input.length - 1] === '+') {
          setLastButtonWasEqual(false)
          return input + '-'
        }
        if (input[input.length - 1] === '/') {
          setLastButtonWasEqual(false)
          return input + '-'
        }
        if (input[input.length - 1] === '*') {
          setLastButtonWasEqual(false)
          return input + '-'
        }
      }
      if (newChar === '*') {
        if (input[input.length - 1] === '*') {
          setLastButtonWasEqual(false)
          return input
        }
        if (input[input.length - 1] === '+') {
          setLastButtonWasEqual(false)
          return input.slice(0,input.length - 1) + '*'
        }
        if (input[input.length - 1] === '/') {
          setLastButtonWasEqual(false)
          return input.slice(0,input.length - 1) + '*'
        }
        if (input[input.length - 1] === '-') {
          setLastButtonWasEqual(false)
          return input.slice(0,input.length - 1) + '*'
        }
      }
      if (newChar === '/') {
        if (input[input.length - 1] === '/') {
          setLastButtonWasEqual(false)
          return input
        }
        if (input[input.length - 1] === '+') {
          setLastButtonWasEqual(false)
          return input.slice(0,input.length - 1) + '/'
        }
        if (input[input.length - 1] === '*') {
          setLastButtonWasEqual(false)
          return input.slice(0,input.length - 1) + '/'
        }
        if (input[input.length - 1] === '-') {
          setLastButtonWasEqual(false)
          return input.slice(0,input.length - 1) + '/'
        }
      }
      setLastButtonWasEqual(false)
      return input + newChar
    })
    console.log(newChar)
    console.log(input)
  }

  const Equals = () => {
    var charsToSliceOff = 0
    if (input.length >= 2) {
      if ((input[input.length - 1] === '*' || input[input.length - 1] === '+' || input[input.length - 1] === '-' || input[input.length - 1] === '/') && 
      (input[input.length - 2] === '*' || input[input.length - 2] === '+' || input[input.length - 2] === '-' || input[input.length - 2] === '/')) {
        charsToSliceOff = 2
      }
      else {
        if (input[input.length - 1] === '*' || input[input.length - 1] === '+' || input[input.length - 1] === '-' || input[input.length - 1] === '/') {
          charsToSliceOff = 1
        }
      }
    }
    let evaluatedNumber = Math.round(eval(input.slice(0,input.length - charsToSliceOff)) * 10000) / 10000
    if (evaluatedNumber >= 1000000000) {
      evaluatedNumber = 999999999
    }
    setOutput(evaluatedNumber)
    
    setClickedEqual(true)
    setLastButtonWasEqual(true)
  }

  useEffect(() => {
    setInput(input => {
      console.log(clickedEqual)
      if (clickedEqual) {
        return output
      }
      else {
        return input
      }
    })
  }, [clickedEqual])

  return (
    <div className="App">
      <div className="calculator-container">
        <div className="calculator">
          <div className="display">
            <div id="input">
              {input}
            </div>
            <div id="output">
              {output}
            </div>
          </div>
          <div className="buttons">
            <div className="first-button-row">
              <button id="clear" onClick={Reset}>AC</button>
              <button value="/" id="divide" onClick={NewChar}>/</button>
              <button value="*" id="multiply" onClick={NewChar}>x</button>
            </div>
            <div className="button-block">
              <button value="7" id="seven" onClick={NewChar}>7</button>
              <button value="8" id="eight" onClick={NewChar}>8</button>
              <button value="9" id="nine" onClick={NewChar}>9</button>
              <button value="4" id="four" onClick={NewChar}>4</button>
              <button value="5" id="five" onClick={NewChar}>5</button>
              <button value="6" id="six" onClick={NewChar}>6</button>
              <button value="1" id="one" onClick={NewChar}>1</button>
              <button value="2" id="two" onClick={NewChar}>2</button>
              <button value="3" id="three" onClick={NewChar}>3</button>
              <button value="0" id="zero" onClick={NewChar}>0</button>
              <button value="." id="decimal" onClick={NewChar}>.</button>
            </div>
            <div className="right-button-block">
              <button value="-" id="subtract" onClick={NewChar}>-</button>
              <button value="+" id="add" onClick={NewChar}>+</button>
              <button id="equals" onClick={Equals}>=</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
