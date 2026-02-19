import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => `/users${location.search}`,
      providesTags: ['user']
      // transformResponse: (response: { data: any }) => response.data,
    }),
    getAdmin: build.query({
      query: () => `/admins/get-admin${location.search}`,
      providesTags: ['admin'],
      transformResponse: (response: { data: any }) => response.data,
    }),
    getProfile: build.query({
      query: () => `/users/profile`,
      providesTags: ["profile"],
      transformResponse: (response: { data: any }) => response.data,
    }),
    createAdmin: build.mutation({
      query: (data) => ({
        url: "/admins/create-admin",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["admin"]
    }),
    editProfile: build.mutation({
      query: (data) => ({
        url: '/users/profile',
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"]
    }),
    updateUser: build.mutation({
      query: (data) => {
        return {
          url: `/users/${data?.id}`,
          method: "PATCH",
          body: data
        }
      },
      invalidatesTags: ['user', 'admin'],
    }),
    deleteUser: build.mutation({
      query: (id) => {
        return {
          url: `/admins/${id}`,
          method: "DELETE"
        }
      }
    }),
    getAllSubscriber: build.query({
      query: () => `/subscriptions${location?.search}`,
      transformResponse: (res: { data: any }) => res?.data
    })
  }),
});

export const {
  useGetUsersQuery,
  useGetAdminQuery,
  useGetProfileQuery,
  useGetAllSubscriberQuery,

  useDeleteUserMutation,
  useEditProfileMutation,
  useCreateAdminMutation,
  useUpdateUserMutation,
} = userApi;
