import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import ComboBox from './ComboBox'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Pear', value: 'pear' },
  { label: 'Grape', value: 'grape' }
]
describe('<ComboBox />', () => {
  it('renders the placeholder text by default', () => {
    const { queryByPlaceholderText } = render(<ComboBox placeHolder="Select a fruit" options={options} onChange={jest.fn()} isMulti={false} />)
    expect(queryByPlaceholderText('Select a fruit')).toBeInTheDocument()
  })

  it('opens the dropdown menu when clicked', () => {
    const { getByText, container } = render(<ComboBox placeHolder="Select an option" options={options} onChange={jest.fn()} isMulti={false} />)

    const input = container.getElementsByClassName('combo-box')[0]
    fireEvent.click(input)
    expect(getByText('Apple')).toBeInTheDocument()
    expect(getByText('Banana')).toBeInTheDocument()
    expect(getByText('Pear')).toBeInTheDocument()
    expect(getByText('Grape')).toBeInTheDocument()
  })

  it('displays selected option when clicked', () => {
    const { container, getByText, getByPlaceholderText } = render(<ComboBox placeHolder="Select an option" options={options} onChange={jest.fn()} isMulti={false} />)
    const input = container.getElementsByClassName('combo-box')[0]
    fireEvent.click(input)
    const option2 = getByText('Banana')
    fireEvent.click(option2)
    expect(getByPlaceholderText('Banana')).toBeInTheDocument()
  })

  it('displays multiple selected options', () => {
    const { container, getAllByText } = render(<ComboBox placeHolder="Select an option" options={options} isMulti onChange={jest.fn()} />)
    const input = container.getElementsByClassName('combo-box')[0]

    fireEvent.click(input)
    const option2 = getAllByText('Banana')[0]
    fireEvent.click(option2)
    const option4 = getAllByText('Grape')[0]
    fireEvent.click(option4)
    expect(getAllByText('Banana').length).toBe(2)
    expect(getAllByText('Grape').length).toBe(2)
  })

  it('removes selected option when close icon is clicked', () => {
    const onChange = jest.fn()
    const { getByText, container, getByRole, getAllByText } = render(<ComboBox placeHolder="Select an option" options={options} onChange={onChange} isMulti />)
    const input = container.getElementsByClassName('combo-box')[0]

    fireEvent.click(input)
    const option2 = getByText('Banana')
    fireEvent.click(option2)
    expect(getAllByText('Banana').length).toBe(2)
    const closeIcon = getByRole('button')
    fireEvent.click(closeIcon)
    expect(getAllByText('Banana').length).toBe(1)
    expect(onChange).toHaveBeenCalledWith([])
  })

  it('filters options when search value is entered', () => {
    const { getByRole, getByText, queryByText, container } = render(<ComboBox placeHolder="Select an option" options={options} onChange={jest.fn()} isMulti={false} />)
    const input = container.getElementsByClassName('combo-box')[0]

    fireEvent.click(input)
    const searchInput = getByRole('textbox')
    fireEvent.change(searchInput, { target: { value: 'ba' } })
    expect(queryByText('Apple')).not.toBeInTheDocument()
    expect(getByText('Banana')).toBeInTheDocument()
  })
})
