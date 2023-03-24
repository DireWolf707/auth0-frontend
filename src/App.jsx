import React from "react"
import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Stack } from "@mui/material"
import Navbar from "./components/Navbar"
import AuthLoader from "./components/loaders/AuthLoader"
import { Profile, Home, Error404 } from "./pages"

const LoggedInRoute = ({ user, redirectPath }) => {
  if (!user) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

const NonLoggedInRoute = ({ user, redirectPath }) => {
  if (user) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

const App = () => {
  // if (isFetching || isError)
  //   return (
  //     <Stack sx={{ height: "100vh", width: "100vw", bgcolor: "#000" }}>
  //       <AuthLoader />
  //     </Stack>
  //   )

  const data = {}
  return (
    <Stack sx={{ height: "100vh", width: "100vw", bgcolor: "#000" }}>
      <Navbar user={data?.user} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<AuthLoader />} />

        {/* LoggedIn Routes */}
        <Route element={<LoggedInRoute user={data?.user} redirectPath="/login" />}>
          <Route path="/profile/*" element={<Profile />} />
        </Route>

        {/* Non-LoggedIn Routes */}
        {/* <Route element={<NonLoggedInRoute user={data?.user} redirectPath="/profile" />}>
          <Route path="/login" element={<Login />} />
        </Route> */}

        {/* Unknown Routes (404) */}
        <Route path="*" element={<Error404 />} />

        {/* End */}
      </Routes>
    </Stack>
  )
}

export default App
