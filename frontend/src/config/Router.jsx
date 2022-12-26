import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

const Router = () => {
  return (
    <Fragment>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home/:id' element={<Home />} />
        </Routes>
    </Fragment>
  )
}

export default Router