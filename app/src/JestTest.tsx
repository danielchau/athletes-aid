import * as React from 'react'

export function giveMeFive() {
  return 5
}

const Props = {
  buttonText: String
}

export default (Props) => (
  <button onClick={e => console.log(giveMeFive())}>{Props.buttonText}</button>
)