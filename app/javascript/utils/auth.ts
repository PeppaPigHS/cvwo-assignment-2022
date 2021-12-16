import { initialState, UserAction } from '../components/UserContext'
import { getCSRFToken } from './csrfToken'

export const handleLogout = (userDispatch: React.Dispatch<UserAction>) => {
  const postDeleteSession = async () => {
    const token = getCSRFToken()
    const response = await fetch(`/logout`, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (data.status && data.status === 200) {
      userDispatch({
        type: 'RECEIVE_USER',
        payload: initialState.user.user,
      })
      userDispatch({
        type: 'RECEIVE_CONTEXT',
        payload: initialState.user,
      })
      userDispatch({
        type: 'LOADING_DONE',
      })
    } else {
      alert('Could not log out. Please try again later.')
    }
  }

  postDeleteSession()
}
