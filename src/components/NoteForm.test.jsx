import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  // This mock fn simulates the API call fn
  const mockCreateNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={mockCreateNote} />)

  // Get input field using its ARIA role which is textbox
  const inputField = screen.getByRole('textbox')
  const saveButton = screen.getByText('save')

  await user.type(inputField, 'typing')
  await user.click(saveButton)

  // After above, createNote should be called ONCE with a noteObject created i.e. ONE argument
  expect(mockCreateNote.mock.calls).toHaveLength(1)
  expect(mockCreateNote.mock.calls[0][0].content).toBe('typing')
})
