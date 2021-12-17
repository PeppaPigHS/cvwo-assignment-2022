import React from 'react'
import { ITask } from '../components/TaskTable'
import { IData } from '../components/UserContext'
import { getCSRFToken } from './csrfToken'

export const generateColor = (name: string) => {
  const color = [
    'bg-red-100 text-red-800',
    'bg-yellow-100 text-yellow-800',
    'bg-green-100 text-green-800',
    'bg-blue-100 text-blue-800',
    'bg-indigo-100 text-indigo-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
  ]

  const crossColor = [
    'text-red-400 hover:bg-red-200 hover:text-red-500 focus:bg-red-500',
    'text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500 focus:bg-yellow-500',
    'text-green-400 hover:bg-green-200 hover:text-green-500 focus:bg-green-500',
    'text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500',
    'text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500',
    'text-purple-400 hover:bg-purple-200 hover:text-purple-500 focus:bg-purple-500',
    'text-pink-400 hover:bg-pink-200 hover:text-pink-500 focus:bg-pink-500',
  ]

  let colorIndex = 0
  for (let i = 0; i < name.length; i++) {
    colorIndex = (colorIndex * 255 + name.charCodeAt(i)) % 7
  }

  return { color: color[colorIndex], crossColor: crossColor[colorIndex] }
}

const generateSearchParams = (user: IData) => {
  const searchParams = {}
  if (user.searchTitle !== '') {
    searchParams['title_keyword'] = user.searchTitle
  }
  if (user.searchDescription !== '') {
    searchParams['description_keyword'] = user.searchDescription
  }
  if (user.searchStatus !== 2) {
    searchParams['status'] = user.searchStatus
  }
  if (user.searchTagList.length !== 0) {
    searchParams['tag_list'] = user.searchTagList
  }

  return searchParams
}

export const searchTask = (
  user: IData,
  props: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
  }
) => {
  const postSearchTask = async () => {
    const token = getCSRFToken()
    const response = await fetch('/api/task_list', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(generateSearchParams(user)),
    })
    if (response.ok) {
      const data = await response.json()
      if (data.status && data.status === 200) {
        await handleTaskID(data.task_id)
      } else {
        props.setTasks([])
        props.setErrors(data.errors)
      }
    } else {
      props.setErrors(['Unable to load tasks.'])
    }
    props.setLoading(false)
  }

  const handleTaskID = async (task_id: number[]) => {
    const table: ITask[] = await Promise.all(
      task_id.map(async (id: number): Promise<ITask> => {
        const response = await fetch(`/api/tasks/${id}`, {
          method: 'GET',
        })
        const data = await response.json()
        if (data.status && data.status == 200) {
          return {
            id: id,
            title: data.task.title,
            description: data.task.description ? data.task.description : '',
            status: data.task.status,
            tags: data.tags.map((tag) => {
              return tag.name
            }),
          }
        }
      })
    )

    props.setTasks(table)
  }

  props.setLoading(true)
  postSearchTask()
}
