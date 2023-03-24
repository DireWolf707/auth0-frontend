import React from "react"
import { Box } from "@mui/material"

const Error404 = () => {
  return (
    <Stack sx={{ height: "100vh", width: "100vw", bgcolor: "#000" }}>
      <Box component="img" src="/503.svg" sx={{ m: "auto", height: "75%", width: "80%" }} />
    </Stack>
  )
}

export default Error404
