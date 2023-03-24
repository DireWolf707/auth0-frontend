import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { createTheme, ThemeProvider } from "@mui/material"
import { SnackbarProvider } from "notistack"
import { BrowserRouter as Router } from "react-router-dom"
import { Auth0ProviderWithNavigate } from "./components/auth0/Auth0ProviderWithNavigate"
import "./index.css"

const theme = createTheme({})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider autoHideDuration={2500} dense={false} maxSnack={3} hideIconVariant={false}>
        <Router>
          <Auth0ProviderWithNavigate>
            <App />
          </Auth0ProviderWithNavigate>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
)
