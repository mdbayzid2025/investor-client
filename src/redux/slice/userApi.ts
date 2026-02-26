import { baseApi } from "../baseApi";
import Cookies from "js-cookie";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query({
            query: () => ({ url: `/users/profile`, method: "GET" }),
            providesTags: ["profile"],
            transformResponse: (response: { data: any }) => response.data,
        }),
        getUserAnalytics: build.query({
            query: () => ({ url: `/dashboard/user-analysis`, method: "GET" }),
            providesTags: ["profile"],
            transformResponse: (response: { data: any }) => response.data,
        }),


        getUsers: build.query({
            query: () => ({
                url: `/users${location.search}`,
                method: "GET"
            }),
            providesTags: ['user']
            // transformResponse: (response: { data: any }) => response.data,
        }),
        getAdmin: build.query({
            query: () => ({ url: `/admins/get-admin${location.search}`, method: "GET" }),
            providesTags: ['admin'],
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
                 headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            }),
            invalidatesTags: ["profile"]
        }),
        verifyAccount: build.mutation({
            query: (data: FormData) => ({
                url: "/kyc/submit-kyc",
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            }),
            invalidatesTags: ["profile"],
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
            query: () => ({ url: `/subscriptions${location?.search}`, method: "GET" }),
            transformResponse: (res: { data: any }) => res?.data
        })
    }),
});

export const {
    useGetUserAnalyticsQuery,
    useGetUsersQuery,
    useGetAdminQuery,
    useGetProfileQuery,
    useGetAllSubscriberQuery,

    useVerifyAccountMutation,
    useDeleteUserMutation,
    useEditProfileMutation,
    useCreateAdminMutation,
    useUpdateUserMutation,
} = userApi;
