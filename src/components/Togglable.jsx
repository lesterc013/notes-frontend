import { useState } from "react"
/**
 * Will take in a React component like LoginForm as props.children
 * Then before it, it will implement the togglable logic
 */
const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideThisWhenVisible = { display: visible ? 'none' : '' }
  const displayThisWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideThisWhenVisible}>
        <button onClick={() => setVisible(!visible)}>{props.buttonLabel}</button>
      </div>

      <div style={displayThisWhenVisible}>
        {props.children}
        <button onClick={() => setVisible(!visible)}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable