import React from 'react'

const SimulationButton = ({ onButtonClick, children }) => {
  return (
    <button className='simulation-button' onClick={onButtonClick}>{children}</button>
  )
}

export default SimulationButton