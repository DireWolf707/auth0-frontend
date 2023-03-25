import React, { useRef, useState } from "react"
import { Stack, Box, TextField, Button, IconButton } from "@mui/material"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import DeleteIcon from "@mui/icons-material/Delete"
import { useBackendErrorHandler } from "../../hooks/useBackendErrorHandler"
import { useSnackbar } from "notistack"
import { toastOptions } from "../../utils/toastOptions"
import { useAuth0 } from "@auth0/auth0-react"
import { useUpdateProfileMutation, useDeleteAvatarMutation, useUpdateAvatarMutation } from "../../../store"

const DetailsChange = () => {
  const { enqueueSnackbar: toast } = useSnackbar()
  const { user, getAccessTokenSilently } = useAuth0()
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const [updateAvatar, { isLoading: isAvatarUpdating }] = useUpdateAvatarMutation()
  const [deleteAvatar, { isLoading: isAvatarDeleting }] = useDeleteAvatarMutation()

  const fileRef = useRef(null)
  const nameRef = useRef(null)
  const [formErrors, setFormErrors] = useState({})
  const { errorHandler } = useBackendErrorHandler(setFormErrors)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = nameRef.current.value

    const accessToken = await getAccessTokenSilently()
    updateProfile({ accessToken, name })
      .unwrap()
      .then((resp) => {
        setFormErrors({})
        toast(resp.data, toastOptions("success"))
        getAccessTokenSilently({ cacheMode: "off" })
      })
      .catch(errorHandler)
  }

  const handleUpdateAvatar = async (e) => {
    const file = e.target.files[0]
    const avatarData = new FormData()
    avatarData.append("file", file)
    const accessToken = await getAccessTokenSilently()

    updateAvatar({ accessToken, avatarData })
      .unwrap()
      .then((resp) => toast(resp.data, toastOptions("success")) && getAccessTokenSilently({ cacheMode: "off" }))
      .catch(errorHandler)
  }

  const handleDeleteAvatar = async () => {
    const accessToken = await getAccessTokenSilently()
    deleteAvatar({ accessToken })
      .unwrap()
      .then((resp) => toast(resp.data, toastOptions("success")) && getAccessTokenSilently({ cacheMode: "off" }))
      .catch(errorHandler)
  }

  return (
    <Stack
      component="form"
      alignItems="center"
      onSubmit={handleSubmit}
      gap={1.2}
      sx={{ borderRadius: "4px", m: "auto", p: "24px", bgcolor: "white", width: "320px" }}
    >
      <Stack flexDirection="row" alignItems="end" sx={{ mt: "-106px", mb: "12px" }}>
        <IconButton onClick={handleDeleteAvatar} disabled={isAvatarDeleting} sx={{ mb: "34px", visibility: !user.picture && "hidden" }}>
          <DeleteIcon fontSize="large" sx={{ fill: "red", p: "2px" }} />
        </IconButton>

        <Box
          component="img"
          src={user.picture || "/blank.png"}
          sx={{ height: "185px", width: "180px", borderRadius: "100%", objectFit: "cover" }}
        />

        <IconButton onClick={() => fileRef.current.click()} sx={{ mb: "34px" }}>
          <input ref={fileRef} onChange={handleUpdateAvatar} disabled={isAvatarUpdating} type="file" hidden />
          <AddAPhotoIcon fontSize="large" sx={{ fill: "red", p: "2px" }} />
        </IconButton>
      </Stack>

      <TextField
        label="Email"
        variant="outlined"
        size="small"
        color="error"
        fullWidth
        type="email"
        defaultValue={user.email}
        disabled={true}
      />

      <TextField
        label="Username"
        variant="outlined"
        size="small"
        color="error"
        fullWidth
        type="text"
        defaultValue={user.username}
        disabled={true}
      />

      {[{ label: "Name", errField: "name", ref: nameRef, type: "text", required: true, initialValue: user.name }].map(
        ({ label, errField, ref, type, required, initialValue, disabled }, idx) => (
          <TextField
            key={idx}
            inputProps={{ ref }}
            label={label}
            variant="outlined"
            size="small"
            color="error"
            fullWidth
            required={required}
            type={type}
            error={Boolean(formErrors[errField])}
            helperText={formErrors[errField]}
            defaultValue={initialValue}
            disabled={disabled}
          />
        )
      )}

      <Button type="submit" variant="contained" color="error" fullWidth disabled={isLoading || isAvatarUpdating || isAvatarDeleting}>
        Update Details
      </Button>
    </Stack>
  )
}

export default DetailsChange
