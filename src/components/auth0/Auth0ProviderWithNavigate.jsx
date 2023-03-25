import React from "react"
import { Auth0Provider } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate()
  const onRedirectCallback = (appState) => navigate(appState?.returnTo || window.location.pathname)

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
        scope: "profile email", // default
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
