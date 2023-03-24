import React from "react"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import AuthLoader from "../loaders/AuthLoader"

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <AuthLoader />,
  })

  return <Component />
}
