import { DisplayFuncs } from "./Display";

const cyan = 'rgb(38,235,212)'
const red = 'rgb(255, 97, 97)'

interface Button {
  symbol: string,
  whenClicked: any,
  color: string
}

export default function Buttons({displayFuncs}: {displayFuncs: DisplayFuncs}) {

  let buttons: Button[] = [];
  const symbols = [
    'AC', '(', ')', '/',
    '7', '8', '9', 'x',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    'C', '0', '.', '=',
  ]

  let redSymbols = ['/', 'x', '-', '+', '=']
  let cyanSymbols = ['AC', '(', ')', 'C']
  for (let symbol of symbols) {
    let button: Button = {
      symbol: symbol,
      whenClicked: () => displayFuncs.handleInput(symbol),
      color: 'white'
    }

    if (cyanSymbols.includes(symbol)) {
      button.color = cyan
    } else if (redSymbols.includes(symbol)) {
      button.color = red
    }

    buttons.push(button)
  }

  return (
    <div className="buttons">
      {buttons.map(b => {
        let className = 'button'
        return (
          <button
            key={crypto.randomUUID()}
            className={className}
            onClick={b.whenClicked}
            style={{
              color: b.color
            }}
          >
            {b.symbol}
          </button>
        )

      })}
    </div>
  )
}