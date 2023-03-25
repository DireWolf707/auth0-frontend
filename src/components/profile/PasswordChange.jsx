import React, { useRef, useState } from "react"
import { Stack, TextField, Button, Typography } from "@mui/material"
import { useBackendErrorHandler } from "../../hooks/useBackendErrorHandler"
import { useSnackbar } from "notistack"
import { toastOptions } from "../../utils/toastOptions"
import { useAuth0 } from "@auth0/auth0-react"
import { useUpdatePasswordMutation } from "../../../store"

const PasswordChange = () => {
  const { enqueueSnackbar: toast } = useSnackbar()
  const { getAccessTokenSilently } = useAuth0()
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

  const passwordRef = useRef(null)
  const passwordConfirmRef = useRef(null)
  const [formErrors, setFormErrors] = useState({})
  const { errorHandler } = useBackendErrorHandler()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const password = passwordRef.current.value
    const passwordConfirm = passwordConfirmRef.current.value
    if (password !== passwordConfirm) return setFormErrors({ passwordConfirm: "Password don't match." })
    else setFormErrors({})

    const accessToken = await getAccessTokenSilently()
    updatePassword({ accessToken, password })
      .unwrap()
      .then((resp) => {
        toast(resp.data, toastOptions("success"))
        getAccessTokenSilently({ cacheMode: "off" })
      })
      .catch(errorHandler)
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      gap={1.2}
      sx={{ borderRadius: "4px", m: "auto", p: "24px", bgcolor: "white", width: "320px" }}
    >
      <Typography variant="h6" fontWeight="bold" color="red" textAlign="center">
        Change Password
      </Typography>

      {[
        { label: "Password", errField: "password", ref: passwordRef, type: "password", required: true },
        { label: "Confirm Password", errField: "passwordConfirm", ref: passwordConfirmRef, type: "password", required: true },
      ].map(({ label, errField, ref, type, required }, idx) => (
        <TextField
          key={idx}
          inputProps={{ ref }}
          label={label}
          variant="outlined"
          size="small"
          color="error"
          required={required}
          type={type}
          error={Boolean(formErrors[errField])}
          helperText={formErrors[errField]}
        />
      ))}

      <Button type="submit" variant="contained" color="error" disabled={isLoading}>
        Submit
      </Button>
    </Stack>
  )
}

export default PasswordChange
