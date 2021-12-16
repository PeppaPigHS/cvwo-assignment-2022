import React from 'react'

interface IChoice {
  choice: string[]
  id: number[]
  activeID: number
  setActiveID: React.Dispatch<React.SetStateAction<number>>
}

const Choice = (props: IChoice) => {
  return (
    <div className={`grid grid-cols-${props.id.length} gap-3`}>
      {props.choice.map((choice: string, index: number) => {
        return (
          <button
            type="button"
            key={props.id[index]}
            onClick={() => {
              props.setActiveID(props.id[index])
            }}
            className={
              props.activeID === props.id[index]
                ? 'inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                : 'inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }
          >
            {choice}
          </button>
        )
      })}
    </div>
  )
}

export default Choice
