import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import UserContext from './UserContext'
import App from './App'
import Signin from './Signin'
import Signup from './Signup'
import FourZeroFour from './404'
import NewTask from './NewTask'
import EditTask from './EditTask'

const Home = () => {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="new" element={<NewTask />} />
          <Route path="edit/:id" element={<EditTask />} />
          <Route path="*" element={<FourZeroFour />} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  )
}

export default Home
