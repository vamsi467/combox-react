import React, { useEffect, useRef, useState } from 'react'
import './ComboBox.scss'
interface Option {
  label: string
  value: string
  image?: string
}

interface DropdownProps {
  placeHolder: string
  options: Option[]
  isMulti: boolean
  onChange: (newValue: Option[] | Option | null) => void
}

const Icon = (): JSX.Element => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  )
}

const CloseIcon = (): JSX.Element => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
    </svg>
  )
}

const Dropdown = ({
  placeHolder,
  options,
  isMulti,
  onChange
}: DropdownProps): JSX.Element => {
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
            <div key={option.value} >
              <span>{option.label}</span>
              <button
                onClick={(e) => { onTagRemove(e, option) }}
                className="close"
              >
                <CloseIcon />
              </button>
            </div>
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

  const isSelected = (option: Option): boolean => {
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0
    }

    if (selectedValue == null) {
      return false
    }

    return selectedValue.length > 0 && selectedValue[0].value === option.value
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

  return (
    <div ref={inputRef} className="combo-box-container">
      <div className="combo-box" onClick={handleInputClick} >
        {isMulti && (selectedValue.length > 0) && (<div className="">{getDisplay()}</div>)}

        <div className="combo-box__input">
            <input className="search-box " onFocus={handleInputClick} placeholder={isMulti ? placeHolder : getDisplay()} onChange={onSearch} value={searchValue} ref={searchRef} />
          <Icon />
        </div>
      </div>
      {showMenu && (
        <div className="dropdown">
            {getOptions().length === 0 && (<div className='dropdown__item'>{(searchValue.length > 0) ? 'No options for this search' : 'No options'} </div>)}

          {getOptions().map((option: Option) => (
            <div onClick={() => { onItemClick(option) }} className={`dropdown__item ${isSelected(option) ? 'selected' : ''}`} key={option.value}>
                <img width={'24px'} src={option.image} alt={option.label} />
                <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
