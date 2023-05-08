import React, { useEffect, useRef, useState } from 'react'
import './ComboBox.scss'
import DropdownList from './dropdown/DropdownList'
import Icon from './icon/Icon'
import { type Option } from './types'
import Badge from './badge/Badge'

interface ComboBoxProps {
  placeHolder: string
  options: Option[]
  isMulti: boolean
  onChange: (newValue: Option[] | Option | null) => void
}

const ComboBox = ({
  placeHolder,
  options,
  isMulti,
  onChange
}: ComboBoxProps): JSX.Element => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<Option[]>(
    []
  )
  const [searchValue, setSearchValue] = useState<string>('')
  const searchRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSearchValue('')
    if (showMenu && (searchRef.current != null)) {
      searchRef.current.focus()
    }
  }, [showMenu])

  useEffect(() => {
    const handler = (e: any): void => {
      if ((inputRef.current != null) && !inputRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }

    window.addEventListener('click', handler)
    return () => {
      window.removeEventListener('click', handler)
    }
  })
  const handleInputClick = (e: any): void => {
    setShowMenu(true)
  }

  const getDisplay = (): any => {
    if (selectedValue.length === 0) {
      return placeHolder
    }
    if (isMulti) {
      return (
                <div className="seleted-tags">
                    {(selectedValue).map((option: Option) => (
                        <Badge key={option.value} label={option.label} close={ (e) => { onTagRemove(e, option) }}></Badge>
                    ))}
                </div>
      )
    }
    return selectedValue[0].label
  }

  const removeOption = (option: Option): Option[] => {
    return selectedValue.filter((o) => o.value !== option.value)
  }

  const onTagRemove = (e: any, option: Option): void => {
    e.stopPropagation()
    const newValue = removeOption(option)
    setSelectedValue(newValue)
    onChange(newValue)
  }

  const onItemClick = (option: Option): void => {
    let newValue
    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option)
      } else {
        newValue = [...selectedValue, option]
      }
    } else {
      newValue = [option]
    }
    setSelectedValue(newValue)
    onChange(newValue)
  }

  const onSearch = (e: any): void => {
    console.log(e.target.value)
    setSearchValue(e.target.value)
  }

  const getOptions = (): Option[] => {
    if (searchValue.length === 0) {
      return options
    }

    return options.filter(
      (option: Option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setShowMenu(true)
        break
      case 'Escape':
        setShowMenu(false)
        break
      default:
        break
    }
  }

  return (
        <div ref={inputRef} className="combo-box-container" onKeyDown={handleKeyDown}>
            <div className="combo-box" onClick={handleInputClick} >
                {isMulti && (selectedValue.length > 0) && (<div className="">{getDisplay()}</div>)}

                <div className="combo-box__input">
                    <input
                        role="combobox"
                        aria-label={placeHolder}
                        aria-haspopup="listbox"
                        aria-expanded={showMenu}
                        aria-controls="dropdown"
                        aria-owns="dropdown"
                        className="search-box"
                        onFocus={handleInputClick}
                        placeholder={isMulti ? placeHolder : getDisplay()}
                        onChange={onSearch}
                        value={searchValue}
                        ref={searchRef} />
                    <Icon icon='chevron-down' />
                </div>
            </div>
            {showMenu && (
                <DropdownList
                    onItemClick={onItemClick}
                    options={getOptions()}
                    isMulti={isMulti}
                    searchValue={searchValue}
                    selectedValue={selectedValue}
                />
            )}
        </div>
  )
}

export default ComboBox
