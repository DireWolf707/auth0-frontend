import React from "react"
import { Routes, Route } from "react-router-dom"
import { Stack } from "@mui/material"
import Navbar from "./components/Navbar"
import AuthLoader from "./components/loaders/AuthLoader"
import { Profile, Home, Callback, Error404, Error503 } from "./pages"
import { useAuth0 } from "@auth0/auth0-react"
import { AuthenticationGuard } from "./components/auth0/AuthenticationGuard"

const App = () => {
  const { isLoading } = useAuth0()

  if (isLoading)
    return (
      <Stack sx={{ height: "100vh", width: "100vw", bgcolor: "#000" }}>
        <AuthLoader />
      </Stack>
    )

  return (
    <Stack sx={{ height: "100vh", width: "100vw", bgcolor: "#000" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/*" element={<AuthenticationGuard component={Profile} />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Stack>
  )
}

export default App
