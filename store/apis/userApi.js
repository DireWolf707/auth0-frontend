import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
  reducerPath: "users",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/user`,
  }),

  endpoints(builder) {
    return {
      updateProfile: builder.mutation({
        query: ({ accessToken, name }) => ({
          url: `/profile`,
          method: "POST",
          body: { name },
          headers: { authorization: `Bearer ${accessToken}` },
        }),
      }),

      updatePassword: builder.mutation({
        query: ({ accessToken, password }) => ({
          url: `/password`,
          method: "POST",
          body: { password },
          headers: { authorization: `Bearer ${accessToken}` },
        }),
      }),

      updateAvatar: builder.mutation({
        query: ({ accessToken, avatarData }) => ({
          url: `/avatar`,
          method: "POST",
          body: avatarData,
          headers: { authorization: `Bearer ${accessToken}` },
        }),
      }),

      deleteAvatar: builder.mutation({
        query: ({ accessToken }) => ({
          url: `/avatar`,
          method: "DELETE",
          headers: { authorization: `Bearer ${accessToken}` },
        }),
      }),
    }
  },
})

export const { useUpdatePasswordMutation, useUpdateProfileMutation, useDeleteAvatarMutation, useUpdateAvatarMutation } = userApi
