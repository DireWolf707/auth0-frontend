import React from "react"
import { Stack, LinearProgress } from "@mui/material"

const AuthLoader = () => {
  return (
    <Stack flexGrow={1} justifyContent="center" alignItems="center" gap={1} sx={{ bgcolor: "#000" }}>
      <LinearProgress color="error" sx={{ height: "8px", width: { xs: "320px", sm: "360px" } }} />
      <LinearProgress color="error" sx={{ height: "8px", width: { xs: "320px", sm: "360px" } }} />
      <LinearProgress color="error" sx={{ height: "8px", width: { xs: "320px", sm: "360px" } }} />
    </Stack>
  )
}

export default AuthLoader
