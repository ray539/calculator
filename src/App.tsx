import { useState } from "react"
import './css/App.css'
import Display, { DisplayFuncs } from "./Display"
import Buttons from "./Buttons"

export interface HistoryFuncs {
  setHistory: (arr: string[]) => void;
}

export default function App() {


  let displayFuncs: DisplayFuncs = {
    handleInput: function (symbol: string): void {
      throw new Error("Function not implemented.");
    },
    handleHistoryJump: function (text: string): void {
      throw new Error("Function not implemented.");
    },
    handleRemoveHistoryItem: function (i: number): void {
      throw new Error("Function not implemented.");
    }
  }
  
  const [history, setHistory] = useState<string[]>([]);
  let historyFuncs: HistoryFuncs = {
    setHistory: (newArr: string[]) => {
      setHistory(newArr)
    }
  }
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  return (
    <>
    <div className="wrapper">
      <div className="history">
        <button 
          className="history-button"
          onClick={() => setIsShowDropdown(!isShowDropdown)}
        >
          History
        </button>
        {isShowDropdown && <div className="dropdown">
          <ul>
            {history.length == 0 ? 'No history' : history.map((item, i) => {
              return <li 
                key={crypto.randomUUID()}
                onClick={() => {
                  displayFuncs.handleHistoryJump(item)
                  setIsShowDropdown(false)
                }}
              >{item.substring(0, 10)} 
              <button onClick={(e) => {
                e.stopPropagation();
                displayFuncs.handleRemoveHistoryItem(i)
              }}
              >x</button></li>
            })}
          </ul>
        </div>}
      </div>


      <Display displayFuncs={displayFuncs} historyFuncs={historyFuncs}></Display>
      <Buttons displayFuncs={displayFuncs}></Buttons>
    </div>
    </>
  )
}