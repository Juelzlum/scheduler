import {useState} from "react"
  
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false ) => {
    setMode(newMode);
    if(replace) {
      setHistory((prev)=> [...prev.splice(0, history.length -1), newMode])
    }
    else{
    setHistory((prev) => [...prev, newMode]);
    }
  }
  const back = () => {
      setMode(history[history.length - 2])
      setHistory((prev)=> [...prev.splice(0, history.length -1)])

  }

  return { mode, transition, back };
}


