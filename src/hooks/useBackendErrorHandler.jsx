import { useSnackbar } from "notistack"
import { useCallback } from "react"
import { toastOptions as toastDefaultOptions } from "../utils/toastOptions"

const toastOptions = toastDefaultOptions()

const defaultHandler = ({ message }, toast) => toast(message, toastOptions)

const handleError400 = ({ message }, toast, setFormErrors) => {
  if (String(message).includes("validation error")) {
    const errors = {}
    message
      .split("(also) ")
      .map((e) => e.split(": ")[1])
      .map((e) => e.split(" on property "))
      .forEach((e) => (errors[e[1].split(" ")[0]] = e[0].split("'")[1]))
    setFormErrors(errors)
  } else toast(message.split(": ")[1], toastOptions)
}

// const handleError401 = ({ error }, toast) => defaultHandler(error, toast)

export const useBackendErrorHandler = (setFormErrors) => {
  const { enqueueSnackbar: toast } = useSnackbar()

  const errorHandler = useCallback(
    (err) => {
      console.log(err)

      switch (err.status) {
        case 400:
          handleError400(err.data, toast, setFormErrors)
          break

        default:
          console.log(err)
          break
      }
    },
    [setFormErrors]
  )

  return { errorHandler }
}
