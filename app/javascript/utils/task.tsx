import { ITask } from '../components/TaskTable'
import { IUserData } from '../components/UserContext'
import { getCSRFToken } from './csrfToken'

const generateSearchParams = (user: IUserData) => {
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
  user: IUserData,
  props: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
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
    const data = await response.json()
    if (data.status && data.status === 200) {
      await handleTaskID(data.task_id)
    } else {
      props.setTasks([])
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
