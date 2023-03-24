import React, { useRef, useState } from "react"
import { Stack, Box, TextField, Button, IconButton } from "@mui/material"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import DeleteIcon from "@mui/icons-material/Delete"
// import { useBackendErrorHandler } from "../../hooks/useBackendErrorHandler"
// import { useSnackbar } from "notistack"
// import { toastOptions } from "../../utils/toastOptions"
import { useAuth0 } from "@auth0/auth0-react"

const DetailsChange = () => {
  // const { enqueueSnackbar: toast } = useSnackbar()
  const { user, getAccessTokenSilently } = useAuth0()

  const nameRef = useRef(null)
  const [formErrors, setFormErrors] = useState({})
  // const { errorHandler } = useBackendErrorHandler(setFormErrors)

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = nameRef.current.value
    console.log(name)
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
        <IconButton sx={{ mb: "34px" }}>
          <AddAPhotoIcon fontSize="large" sx={{ fill: "red", p: "2px" }} />
        </IconButton>

        <Box
          component="img"
          src={user.picture || "/blank.png"}
          sx={{ height: "185px", width: "180px", borderRadius: "100%", objectFit: "cover" }}
        />

        {user.picture && (
          <IconButton sx={{ mb: "34px" }}>
            <DeleteIcon fontSize="large" sx={{ fill: "red", p: "2px" }} />
          </IconButton>
        )}
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

      <Button
        type="submit"
        variant="contained"
        color="error"
        fullWidth
        // disabled={isLoading}
      >
        Update Details
      </Button>
    </Stack>
  )
}

export default DetailsChange
