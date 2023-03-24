import React, { useState } from "react"
import { Stack, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

const Navbar = () => {
  // Menu control variables
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  // Auth0
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0()

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
    handleClose()
  }

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
      },
    })
  }

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    })
  }

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: "60px", borderBottom: "4px solid red", p: "16px" }}
    >
      <Link to="/">
        <Typography variant="h5" fontWeight="bold" color="red">
          Navbar
        </Typography>
      </Link>

      {isAuthenticated ? (
        <>
          <IconButton onClick={handleClick}>
            <AccountCircle sx={{ fontSize: "34px" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              sx: { bgcolor: "red" },
            }}
          >
            <Link to="/profile">
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <MenuItem disabled={isLoading} onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Stack flexDirection="row" gap={1}>
          <Button variant="text" color="error" onClick={handleLogin}>
            login
          </Button>
          <Button variant="contained" color="warning" onClick={handleSignUp}>
            signup
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

export default Navbar
