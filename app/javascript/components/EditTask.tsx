import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, TrashIcon } from '@heroicons/react/outline'

import { getCSRFToken } from '../utils/csrfToken'
import PageLayout from './PageLayout'
import RequiredAuth from './RequiredAuth'
import TagList from './TagList'
import { ITask } from './TaskTable'
import Spinner from './Spinner'
import Choice from './Choice'

const EditTask = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [task, setTask] = useState<ITask>({
    id: 0,
    title: '',
    description: '',
    status: 0,
    tags: [],
  })
  const [errors, setErrors] = useState<string[]>([])

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const cancelButtonRef = useRef(null)

  const fetchTaskDetails = () => {
    const fetchTask = async () => {
      const token = getCSRFToken()
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'GET',
        headers: {
          'X-CSRF-Token': token,
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        if (data.status && data.status === 200) {
          setTask({
            id: data.task.id,
            title: data.task.title,
            description: data.task.description,
            status: data.task.status,
            tags: data.tags.map((tag) => tag.name),
          })
        } else {
          setErrors(['Task does not exist'])
        }
        setLoading(false)
      } else {
        navigate('/', { replace: true })
      }
    }
    fetchTask()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const updateTask = async () => {
      const token = getCSRFToken()
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
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
      if (response.ok) {
        const data = await response.json()
        if (data.status && data.status === 201) {
          navigate('/', { replace: true })
        } else {
          setErrors(data.errors)
        }
      } else {
        setErrors(['Unable to save the task.'])
      }
    }

    updateTask()
  }

  const handleDelete = () => {
    const postDeleteTask = async () => {
      const token = getCSRFToken()
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': token,
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        if (data.status && data.status === 200) {
          navigate('/', { replace: true })
        } else {
          setErrors(data.errors)
        }
      } else {
        setErrors(['Unable to delete the task.'])
      }
    }

    postDeleteTask()
  }

  useEffect(() => {
    fetchTaskDetails()
  }, [])

  return (
    <RequiredAuth>
      <PageLayout>
        {loading ? (
          <Spinner />
        ) : (
          <div className="container py-8 px-0 max-w-7xl mx-auto sm:px-8">
            <form
              onSubmit={handleSubmit}
              className="divide-y divide-gray-200 bg-white shadow overflow-hidden sm:rounded-md sm:mx-8"
            >
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                  <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Edit task
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
                            value={task.title}
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
                          value={task.description}
                          onChange={(e) =>
                            setTask({ ...task, description: e.target.value })
                          }
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5 px-4 py-4 sm:px-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
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
                      <div className="mt-1 sm:mt-0">
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
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setOpenDeleteModal(true)}
                    className="inline-flex items-center px-2 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    <p className="sr-only">Delete</p>
                  </button>
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

            <Transition.Root show={openDeleteModal} as={React.Fragment}>
              <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={setOpenDeleteModal}
              >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            Deactivate account
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete this task?
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => {
                            setOpenDeleteModal(false)
                            handleDelete()
                          }}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                          onClick={() => setOpenDeleteModal(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
        )}
      </PageLayout>
    </RequiredAuth>
  )
}

export default EditTask
