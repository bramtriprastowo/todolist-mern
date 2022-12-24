import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import Signup from '../pages/signup'

const Router = () => {
  return (
    <Fragment>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home' element={<Home />} />
        </Routes>
    </Fragment>
  )
}

export default Router