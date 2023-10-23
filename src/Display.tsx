import { useRef, useState } from "react";
import { HistoryFuncs } from "./App";


export interface DisplayFuncs {
  handleInput: (symbol: string) => void;
  handleHistoryJump: (text: string) => void;
  handleRemoveHistoryItem: (i: number) => void;
}

interface Props {
  displayFuncs: DisplayFuncs, 
  historyFuncs: HistoryFuncs
}

export default function Display({displayFuncs, historyFuncs}: Props) {
  const [mainDisplayText, setMainDisplayText] = useState('');
  const [topDisplayText, setTopDisplayText] = useState('');
  const [displayFontSize, setDisplayFontSize] = useState(30);
  const historyRef = useRef<string[]>([]);

  const refreshRef = useRef(false); // override input right after a equals
  const evaluate = useRef(false);

  function setMainDisplay(text: string) {
    setDisplayFontSize(30)
    if (text.length + 1 > 19) {
      setDisplayFontSize(10)
    } else if (text.length + 1 > 12) {
      setDisplayFontSize(20)
    }
    setMainDisplayText(text)
  }

  displayFuncs.handleHistoryJump = (text: string) => {
    evaluate.current = true;
    refreshRef.current = false;
    setMainDisplay(text);
  }

  displayFuncs.handleRemoveHistoryItem = (i: number) => {
    historyRef.current = historyRef.current.filter((item, index) => index != i);
    historyFuncs.setHistory([...historyRef.current]);
  }

  function handleEquals() {
    if (mainDisplayText == '') {
      setMainDisplay(topDisplayText.substring(0, topDisplayText.length - 1))
      return;
    } else if (mainDisplayText == 'Error') {
      return;
    } else if (mainDisplayText == historyRef.current[historyRef.current.length - 1]) {
      if (evaluate.current) {
        evaluate.current = false;
      } else {
        return;
      }
      
    }
    refreshRef.current = true;
    setMainDisplay('')
    let expr = mainDisplayText;
    expr = expr.replace('x', '*');
    setTopDisplayText(mainDisplayText + '=');

    let res: string;
    try {
      res = eval(expr).toString();
    } catch (e) {
      setMainDisplay('Error')
      return;
    }

    // execution of command successful
    historyRef.current = [mainDisplayText, ...historyRef.current]
    historyFuncs.setHistory([...historyRef.current])
    setMainDisplay(res);
  }


  function handleInput(symbol: string) {
    if (symbol == 'AC') {
      setMainDisplay('')
    } else if (symbol == 'C') {
      if (mainDisplayText.length > 0) {
        setMainDisplay(mainDisplayText.substring(0, mainDisplayText.length - 1))
      }
    } else if (symbol == '=') {
      handleEquals()
    } else {
      if (refreshRef.current) {
        setMainDisplay(symbol)
        refreshRef.current = false;
      } else {
        setMainDisplay(mainDisplayText + symbol)
      }
    }
  }
  displayFuncs.handleInput = handleInput;

  return (
    <div className="display-area">
      <div className="calculations-top">
        {topDisplayText}
      </div>
      <div className="calculations" style={{fontSize: displayFontSize}}>
        {mainDisplayText}
      </div>
    </div>
  )
}