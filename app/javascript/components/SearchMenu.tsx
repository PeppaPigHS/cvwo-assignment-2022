import React, { useState } from 'react'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
} from '@heroicons/react/solid'

import TagList from './TagList'
import { ITask } from './TaskTable'
import { useUser } from './UserContext'
import { searchTask } from '../utils/task'
import Choice from './Choice'

interface ISearchMenu {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

const SearchMenu = (props: ISearchMenu) => {
  const { user, userDispatch } = useUser()

  const [open, setOpen] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = (e) => {
    e.preventDefault()

    searchTask(user, props)
  }

  return (
    <div className="bg-white">
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center rounded-md m-2 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
        >
          <div className="flex items-center gap-x-2">
            {open ? (
              <ChevronDownIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
            Search menu
          </div>
          <SearchIcon className="h-4 w-4" aria-hidden="true" />
        </button>
        {open ? (
          <form onSubmit={handleSubmit} className="bg-white overflow-hidden">
            <div className="space-y-8 sm:space-y-5">
              <div>
                <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:border-t sm:border-gray-200 sm:items-start sm:pt-5 px-4 py-2 sm:px-6">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Title keywords
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-3">
                    <div className="flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title keywords..."
                        value={user.searchTitle}
                        onChange={(e) =>
                          userDispatch({
                            type: 'RECEIVE_CONTEXT',
                            payload: {
                              ...user,
                              searchTitle: e.target.value,
                            },
                          })
                        }
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start sm:pt-5 px-4 py-2 sm:px-6">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Description keywords
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-3">
                    <div className="flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description keywords..."
                        value={user.searchDescription}
                        onChange={(e) =>
                          userDispatch({
                            type: 'RECEIVE_CONTEXT',
                            payload: {
                              ...user,
                              searchDescription: e.target.value,
                            },
                          })
                        }
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-center sm:pt-5 px-4 py-2 sm:px-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-3">
                    <Choice
                      choice={[
                        'Show all status',
                        'Show pending only',
                        'Show done only',
                      ]}
                      id={[2, 0, 1]}
                      activeID={user.searchStatus}
                      setActiveID={(status: number) => {
                        userDispatch({
                          type: 'RECEIVE_CONTEXT',
                          payload: { ...user, searchStatus: status },
                        })
                      }}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start sm:pt-5 px-4 py-2 sm:px-6">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Tags
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-3">
                    <TagList
                      tagList={user.searchTagList}
                      setTagList={(tags: string[]) => {
                        userDispatch({
                          type: 'RECEIVE_CONTEXT',
                          payload: {
                            ...user,
                            searchTagList: tags,
                          },
                        })
                      }}
                      setErrors={setErrors}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end px-4 pt-2 pb-4 sm:px-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                Search
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  )
}

export default SearchMenu
