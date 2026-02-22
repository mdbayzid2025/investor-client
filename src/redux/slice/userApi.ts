import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: `/users${location.search}`,
                method: "GET"
            }),
            providesTags: ['user']
            // transformResponse: (response: { data: any }) => response.data,
        }),
        getAdmin: build.query({
            query: () => ({url: `/admins/get-admin${location.search}`, method: "GET"}),
            providesTags: ['admin'],
            transformResponse: (response: { data: any }) => response.data,
        }),
        getProfile: build.query({
            query: () => ({url: `/users/profile`, method: "GET"}),
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
            query: () => ({url:`/subscriptions${location?.search}`, method: "GET"}),
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
