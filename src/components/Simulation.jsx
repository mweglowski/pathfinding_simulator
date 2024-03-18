import React from 'react'
import Grid from './Grid'
import SimulationButton from './ui/SimulationButton'

const Simulation = () => {
  return (
    <div className='flex flex-col text-stone-400 smooth-display'>
      <div className='mx-auto py-4 text-2xl'>Simulation</div>

      {/* CONTROL INPUTS */}
      <div className='p-4 flex justify-evenly text-stone-500'>
        <div className='flex flex-col'>
          <label htmlFor="step-size">Step size</label>
          <input className="simulation-input" type="number" id="step-size" defaultValue="0.01" placeholder="Step size" step="0.01" />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="delay">Delay</label>
          <input className="simulation-input" type="number" id="delay" defaultValue="0.5" placeholder="Delay" step="0.1" />
        </div>
      </div>

      {/* GRID CONTAINER */}
      <div className='mx-auto flex flex-col'>
        <div className='flex justify-between'>
          <button className='p-1 px-3 border-b-2 w-fit border-stone-600 rounded-t-md hover:text-stone-400 duration-300 hover:border-b-stone-500 text-stone-500 '>Reset simulation</button>
          <button className='p-1 px-3 border-b-2 w-fit border-stone-600 rounded-t-md hover:text-stone-400 duration-300 hover:border-b-stone-500 text-stone-500 '>Configure environment</button>
        </div>

        <Grid />

        <div className='flex justify-between'>
          <SimulationButton onButtonClick={() => { }}>Run agent</SimulationButton>
          <SimulationButton onButtonClick={() => { }}>Train agent</SimulationButton>
          <SimulationButton onButtonClick={() => { }}>Show values</SimulationButton>
        </div>
      </div>
    </div>
  )
}

export default Simulation