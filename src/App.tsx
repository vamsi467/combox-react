/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import ComboBox from './combo-box/ComboBox'
import './App.css'

const options = [
  { label: 'Apple', value: 'apple', image: require('./assets/apple.png') },
  { label: 'Banana', value: 'banana', image: require('./assets/bananas.png') },
  { label: 'Pear', value: 'pear', image: require('./assets/pear.png') },
  { label: 'Grape', value: 'grape', image: require('./assets/grapes.png') }
]

const App = () => {
  const handleOptionChange = (event: any) => {
    console.log(event)
  }

  return (
    <div className='wrapper'>
      <h1>Single Select</h1>
      <ComboBox
        placeHolder ="Choose a fruit"
        isMulti={false}
        options={options}
        onChange={handleOptionChange} />
        <h1>Multi Select</h1>
      <ComboBox
        placeHolder ="Choose a fruit"
        isMulti
        options={options}
        onChange={handleOptionChange} />
      <h1>No options</h1>
      <ComboBox
        placeHolder ="Choose a fruit"
        isMulti
        options={[]}
        onChange={handleOptionChange} />
    </div>
  )
}

export default App
