import React from 'react'
import { type Option } from '../types'
import './Dropdownlist.scss'

interface DropdownListProps {
  options: Option[]
  isMulti: boolean
  searchValue: string
  selectedValue: Option[]
  onItemClick: (option: Option) => void
}
const DropdownList = ({
  options,
  isMulti,
  searchValue,
  selectedValue,
  onItemClick
}: DropdownListProps): JSX.Element => {
  const isSelected = (option: Option): boolean => {
    if (selectedValue.length === 0) {
      return false
    }
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0
    }

    return selectedValue.length > 0 && selectedValue[0].value === option.value
  }
  return (<div className="dropdown" id='dropdown' role="listbox">
    {options.length === 0 && (<div className='dropdown__item'>{(searchValue.length > 0) ? 'No options for this search' : 'No options'} </div>)}

    {options.map((option: Option) => (
      <div aria-selected={isSelected(option)} onClick={() => { onItemClick(option) }} className={`dropdown__item ${isSelected(option) ? 'selected' : ''}`} key={option.value}>
        <img width={'24px'} src={option.image} alt={option.label} />
        <span>{option.label}</span>
      </div>
    ))}
  </div>)
}
export default DropdownList
