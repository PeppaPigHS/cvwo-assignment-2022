import React, { useState } from 'react'

import { classNames } from '../utils/classNames'
import { generateColor } from '../utils/task'

interface ITagList {
  tagList: string[]
  setTagList: React.Dispatch<React.SetStateAction<string[]>>
  setErrors: React.Dispatch<React.SetStateAction<string[]>>
}

const TagList = (props: ITagList) => {
  const [tagInput, setTagInput] = useState<string>('')

  const handleDelete = (tag) => {
    const newTagList = [...props.tagList]
    const index = newTagList.indexOf(tag)
    if (index > -1) {
      newTagList.splice(index, 1)
    }
    props.setTagList(newTagList)
  }

  const handleKeydown = (e) => {
    if (e.key === 'Backspace') {
      if (tagInput === '' && props.tagList.length !== 0) {
        setTagInput(props.tagList[props.tagList.length - 1])
        handleDelete(props.tagList[props.tagList.length - 1])
        return
      }
    }
    if (e.key !== 'Enter' || tagInput === '') {
      return
    }
    e.preventDefault()
    if (props.tagList.indexOf(tagInput) !== -1) {
      props.setErrors(['Tags must be unique.'])
      return
    }
    const newTagList = [...props.tagList]
    newTagList.push(tagInput)
    props.setTagList(newTagList)
    setTagInput('')
  }

  return (
    <div className="flex flex-wrap gap-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm overflow-hidden bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
      {props.tagList.map((tag) => {
        return (
          <span
            key={tag}
            className={classNames(
              'max-w-xs inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium',
              generateColor(tag).color
            )}
          >
            <p className="truncate">{tag}</p>
            <button
              type="button"
              onClick={() => handleDelete(tag)}
              className={classNames(
                'flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white',
                generateColor(tag).crossColor
              )}
            >
              <span className="sr-only">Remove tag</span>
              <svg
                className="h-2 w-2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 8 8"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M1 1l6 6m0-6L1 7"
                />
              </svg>
            </button>
          </span>
        )
      })}
      <input
        type="text"
        value={tagInput}
        onChange={(e) => {
          setTagInput(e.target.value)
          props.setErrors([])
        }}
        onKeyDown={handleKeydown}
        placeholder={props.tagList.length > 0 ? '' : 'Press enter to add tags'}
        className="flex-grow min-w-xs p-0 border-0 focus:outline-none focus:border-blue-500 focus:ring-0 block sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  )
}

export default TagList
