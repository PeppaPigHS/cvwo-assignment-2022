import { RefreshIcon } from '@heroicons/react/outline'
import React from 'react'

const Spinner = () => {
  return (
    <div className="flex flex-grow justify-center items-center w-full text-gray-400">
      <RefreshIcon className="h-16 w-16 animate-spin" />
    </div>
  )
}

export default Spinner
