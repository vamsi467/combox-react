import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  const { getByText } = render(<App />)
  expect(getByText('Single Select')).toBeInTheDocument()
  expect(getByText('Multi Select')).toBeInTheDocument()
})
