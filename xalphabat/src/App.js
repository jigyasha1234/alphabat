import {useState, useEffect, useCallback} from 'react'
import './App.css'

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const App = () => {
  const [text, setText] = useState('')

  const addLetter = letter => setText(prev => prev + letter)
  const backspace = () => setText(prev => prev.slice(0, -1))

  const onKeyDown = useCallback(event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return
    if (event.key === 'Backspace') {
      setText(prev => prev.slice(0, -1))
    } else if (/^[a-zA-Z]$/.test(event.key)) {
      setText(prev => prev + event.key.toUpperCase())
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="heading">Alphabet Buttons</h1>
        <p className="description">
          Click letters (or use your keyboard) to build text.
        </p>
        <div className="output">
          {text === '' ? (
            <span className="placeholder">Your text will appear here...</span>
          ) : (
            text
          )}
        </div>
        <div className="backspace-row">
          <button
            type="button"
            className="backspace-button"
            onClick={backspace}
          >
            Backspace
          </button>
        </div>
        <div className="keys-container">
          {ALPHABETS.map(letter => (
            <button
              key={letter}
              type="button"
              className="key"
              onClick={() => addLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
