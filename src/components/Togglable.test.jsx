import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import { beforeEach, describe, expect, test } from 'vitest'

describe('<Togglable />', () => {
  // Two things - (1) Initialise container outside of the render because we want to access it outside the fn scope, (2) Wrapped the whole render expression in parantheses because if the RHS is not a simple object literal, JS will treat it as a code block; parantheses will help ensure JS treats it as a destructuring
  // Alternatively, is just to access the container key of the return value of render, and assign it to container variable
  let container
  beforeEach(() => {
    // ;({ container } = render(
    //   <Togglable buttonLabel='show...'>
    //     <div className='testDiv'>togglable content</div>
    //   </Togglable>
    // ))
    container = render(
      <Togglable buttonLabel='show...'>
        <div className='testDiv'>togglable content</div>
      </Togglable>
    ).container
  })

  test('render props.children aka children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('expect children to not be visible at start', () => {
    // Because need to access the specific div with the style attribute, based on screen.debug(), this div has the class='togglableContent' which was defined in Togglable.jsx
    // Then we use querySelector to find the div with the class togglableContent
    const childrenDiv = container.querySelector('.togglableContent')
    expect(childrenDiv).toHaveStyle('display: none')
  })

  test('after clicking button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    // class name togglableContent and check style again
    const childrenDiv = container.querySelector('.togglableContent')
    expect(childrenDiv).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const cancelButton = screen.getByText('cancel')
    await user.click(cancelButton)

    const childrenDiv = container.querySelector('.togglableContent')
    expect(childrenDiv).toHaveStyle('display: none')
  })
})
