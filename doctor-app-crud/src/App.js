import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppointmentList from './containers/AppointmentList'
import AppointmentForm from './containers/AppointmentForm'

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<AppointmentList />} />
        <Route path={"/add"} element={<AppointmentForm />} />
        <Route path={"/edit/:id"} element={<AppointmentForm />} />
      </Routes>
    </>
  )
}

export default App
