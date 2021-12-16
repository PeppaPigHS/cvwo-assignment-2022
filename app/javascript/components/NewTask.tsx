import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getCSRFToken } from '../utils/csrfToken'
import PageLayout from './PageLayout'
import RequiredAuth from './RequiredAuth'
import TagList from './TagList'
import { ITask } from './TaskTable'
import Choice from './Choice'

const NewTask = () => {
  const navigate = useNavigate()

  const [task, setTask] = useState<ITask>({
    id: 0,
    title: '',
    description: '',
    status: 0,
    tags: [],
  })
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = (e) => {
    e.preventDefault()

    const fetchSaveTask = async () => {
      const token = getCSRFToken()
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: {
            title: task.title,
            description: task.description,
            status: task.status,
            tag_list: task.tags,
          },
        }),
      })
      const data = await response.json()
      if (data.status && data.status === 201) {
        navigate('/', { replace: true })
      } else {
        setErrors(data.errors)
      }
    }
    fetchSaveTask()
  }

  return (
    <RequiredAuth>
      <PageLayout>
        <div className="container py-8 px-0 max-w-7xl mx-auto sm:px-8">
          <form
            onSubmit={handleSubmit}
            className="divide-y divide-gray-200 bg-white shadow overflow-hidden sm:rounded-md sm:mx-8"
          >
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <div className="px-4 py-4 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Add task
                  </h3>
                </div>

                <div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 px-4 py-4 sm:px-6">
                    <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Title
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          required
                          onChange={(e) =>
                            setTask({ ...task, title: e.target.value })
                          }
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 px-4 py-4 sm:px-6">
                    <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Description{' '}
                      <p className="inline-flex font-normal text-gray-500">
                        (Optional)
                      </p>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={5}
                        onChange={(e) =>
                          setTask({ ...task, description: e.target.value })
                        }
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        defaultValue={''}
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 px-4 py-4 sm:px-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <div className="mt-1 sm:mt-0">
                      <Choice
                        choice={['Pending', 'Done']}
                        id={[0, 1]}
                        activeID={task.status}
                        setActiveID={(status: number) => {
                          setTask({ ...task, status: status })
                        }}
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 px-4 py-4 sm:px-6">
                    <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Tags
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <TagList
                        tagList={task.tags}
                        setTagList={(tags: string[]) => {
                          setTask({ ...task, tags: tags })
                        }}
                        setErrors={setErrors}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 px-4 py-4 sm:px-6">
              {errors.length !== 0 ? (
                <div className="flex justify-end">
                  <span className="text-sm bg-white text-red-500">
                    {errors[0]}
                  </span>
                </div>
              ) : null}
              <div className="flex justify-end">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/"
                    type="button"
                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </PageLayout>
    </RequiredAuth>
  )
}

export default NewTask
