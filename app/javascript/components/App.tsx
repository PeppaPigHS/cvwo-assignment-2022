import React from 'react'

import { useUser } from './UserContext'
import PageLayout from './PageLayout'
import TaskTable from './TaskTable'
import Welcome from './Welcome'
import Spinner from './Spinner'

const App = () => {
  const { user, loading } = useUser()

  return (
    <PageLayout>
      {loading ? <Spinner /> : user.user !== null ? <TaskTable /> : <Welcome />}
    </PageLayout>
  )
}

export default App
