import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import {
  userApi,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
} from "./apis/userApi"

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
})

setupListeners(store.dispatch)

export { useUpdatePasswordMutation, useUpdateProfileMutation, useDeleteAvatarMutation, useUpdateAvatarMutation }
