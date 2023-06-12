import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["contact"],
  baseQuery: fetchBaseQuery({
    baseUrl: " https://contact-app.mmsdev.site/api/v1",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: `/register`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["contact"],
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: `/login`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["contact"],
    }),
    logout: builder.mutation({
      query: (token) => ({
        url: `/user-logout`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
    createContact: builder.mutation({
      query: ({ formData, token }) => ({
        url: `/contact`,
        method: "POST",
        body: formData,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
    editContact: builder.mutation({
      query: ({ formData, token, id }) => ({
        url: `/contact/${id}`,
        method: "PUT",
        body: formData,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
    //About Contact
    getContact: builder.query({
      query: ({token, page}) => ({
        url: `/contact?page=${page}`,
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    //Delete Contact
    deleteContact: builder.mutation({
      query: ({ token, id }) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetContactQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
} = api;
