import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
/**
 * Will take in a React component like LoginForm as props.children
 * Then before it, it will implement the togglable logic
 */
const TogglableComponent = (props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideThisWhenVisible = { display: visible ? 'none' : '' }
  const displayThisWhenVisible = { display: visible ? '' : 'none' }

  // Switches visibility value when called
  const toggleVisible = () => {
    setVisible(!visible)
  }

  // useImperativeHandle 'exports' the function to be used in the parent
  useImperativeHandle(ref, () => {
    return {
      toggleVisible,
    }
  })

  return (
    <div>
      <div style={hideThisWhenVisible}>
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>

      <div style={displayThisWhenVisible} className='togglableContent'>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </div>
  )
}

const Togglable = forwardRef(TogglableComponent)

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
