import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Spinner from './Spinner'

import { useUser } from './UserContext'

interface IRequiredAuth {
  children: React.ReactNode
}

const RequiredAuth = (props: IRequiredAuth) => {
  const { user, loading } = useUser()

  return loading ? (
    <div className="w-full h-screen flex flex-col">
      <Spinner />
    </div>
  ) : user.user !== null ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : (
    <Navigate to="/signin" />
  )
}

export default RequiredAuth
