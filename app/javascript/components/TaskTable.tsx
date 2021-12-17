import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRightIcon, PlusSmIcon } from '@heroicons/react/solid'
import { RefreshIcon } from '@heroicons/react/outline'

import SearchMenu from './SearchMenu'
import { generateColor } from '../utils/task'
import { classNames } from '../utils/classNames'

export interface ITask {
  id: number
  title: string
  description: string
  status: number
  tags: string[]
}

const TaskTable = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [tasks, setTasks] = useState<ITask[]>([])

  return (
    <div className="flex-grow bg-gray-50">
      <div className="container py-8 max-w-7xl mx-auto flex flex-col relative">
        <div className="bg-white shadow overflow-hidden sm:rounded-md sm:mx-8">
          <ul role="list" className="divide-y divide-gray-200">
            <SearchMenu setTasks={setTasks} setLoading={setLoading} />
            {loading ? (
              <div className="p-8 flex justify-center items-center w-full text-gray-400">
                <RefreshIcon className="h-12 w-12 animate-spin" />
              </div>
            ) : tasks.length === 0 ? (
              <div className="p-8 flex justify-center items-center w-full text-gray-400">
                No task found
              </div>
            ) : (
              tasks.map((task: ITask) => (
                <li key={task.id}>
                  <Link
                    to={`/edit/${task.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex items-center text-sm">
                            <p className="font-medium text-lg text-blue-600 truncate">
                              {task.title}
                            </p>
                            {task.status == 0 ? (
                              <span className="ml-4 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                Pending
                              </span>
                            ) : (
                              <span className="ml-4 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Done
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-sm text-gray-500 truncate">
                            {task.description}
                          </p>
                        </div>
                        <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5 sm:max-w-xs">
                          <div className="flex justify-end overflow-x-auto gap-x-2 sm:flex-wrap sm:gap-y-2">
                            {task.tags.map((tag) => (
                              <span
                                key={tag}
                                className={classNames(
                                  'max-w-xs inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium',
                                  generateColor(tag).color
                                )}
                              >
                                <p className="truncate">{tag}</p>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0">
                        <ChevronRightIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="sticky bottom-0 px-5 py-5 flex justify-end sm:px-8">
          <Link
            to="/new"
            type="button"
            className="inline-flex items-center px-3 py-3 border border-transparent shadow-lg text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:px-6"
          >
            <PlusSmIcon
              className="h-6 w-6 sm:-ml-1 sm:mr-3"
              aria-hidden="true"
            />
            <p className="inline-flex hidden sm:block">Add task</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TaskTable
