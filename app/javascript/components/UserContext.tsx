import React, { useReducer, useContext, useEffect } from 'react'

import { handleLogout } from '../utils/auth'

interface IUser {
  id: number
  username: string
  password_digest: string
  created_at: string
  updated_at: string
}

export interface IData {
  searchTitle: string
  searchDescription: string
  searchStatus: number
  searchTagList: string[]
}

export type IUserData = { user: IUser | undefined } & IData

export interface UserState {
  loading: boolean
  user: IUserData
}

export const initialState: UserState = {
  loading: true,
  user: {
    user: null,
    searchTitle: '',
    searchDescription: '',
    searchStatus: 2,
    searchTagList: [],
  },
}

export type UserAction =
  | {
      type: 'RECEIVE_USER'
      payload: IUser
    }
  | {
      type: 'RECEIVE_CONTEXT'
      payload: IData
    }
  | {
      type: 'LOADING_DONE'
    }
  | {
      type: 'LOADING_START'
    }

type userContext = UserState & { userDispatch: React.Dispatch<UserAction> }

const reducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'RECEIVE_USER':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          user: action.payload,
        }),
      })
    case 'RECEIVE_CONTEXT':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          searchTitle: action.payload.searchTitle,
          searchDescription: action.payload.searchDescription,
          searchStatus: action.payload.searchStatus,
          searchTagList: action.payload.searchTagList,
        }),
      })
    case 'LOADING_DONE':
      return Object.assign({}, state, {
        loading: false,
      })
    case 'LOADING_START':
      return Object.assign({}, state, {
        loading: true,
      })
    default:
      return state
  }
}

const UserStateContext = React.createContext<userContext>({
  ...initialState,
  userDispatch: null,
})

export const useUser = () => useContext(UserStateContext)

const UserContext = ({ children }) => {
  const [userState, userDispatch] = useReducer<
    React.Reducer<UserState, UserAction>
  >(reducer, initialState)

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await fetch('/logged_in')
      const data = await response.json()
      if (data.status && data.status === 200) {
        userDispatch({
          type: 'RECEIVE_USER',
          payload: data.user,
        })
        userDispatch({
          type: 'LOADING_DONE',
        })
      } else {
        handleLogout(userDispatch)
      }
    }

    fetchStatus()
  }, [])

  return (
    <UserStateContext.Provider value={{ ...userState, userDispatch }}>
      {children}
    </UserStateContext.Provider>
  )
}

export default UserContext
