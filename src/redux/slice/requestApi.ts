
import Cookies from "js-cookie";
import { baseApi } from "../baseApi";

const requestApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getRequests: build.query({
            query: () => ({
                url: `/requests${location.search}`,
                method: "GET",
            }),
            providesTags: ["request"],
        }),
        ownerRequestAnalytics: build.query({
            query: () => ({
                url: `/requests/request/analysis${location.search}`,
                method: "GET",
            }),
            providesTags: ["request"],
        }),
        getMyRequests: build.query({
            query: () => ({
                url: `/requests/my-listing${location.search}`,
                method: "GET",
            }),
            providesTags: ["request"],            
        }),
        getRequestById: build.query({
            query: (id: string) => ({
                url: `/requests/single/${id}`,
                method: "GET",
            }),
            providesTags: ["request"],
            transformResponse: (response: { data: any }) => response.data,
        }),
        createRequest: build.mutation({
            query: (data) => ({
                url: "/requests/create",
                method: "POST",
                body: data,                
            }),
            invalidatesTags: ["request"],
        }),
        updateRequest: build.mutation({
            query: (data) => ({
                url: `/requests/update/${data?.id}`,
                method: "PATCH",
                body: data,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            }),
            invalidatesTags: ["request"],
        }),
        deleteRequest: build.mutation({
            query: (id: string) => ({
                url: `/requests/delete/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            }),
            invalidatesTags: ["request"],
        }),
        saveRequest: build.mutation({
            query: (id: string) => ({
                url: `/requests/${id}/save`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            }),
            invalidatesTags: ["request", "savedRequest"],
        }),
        getSavedRequests: build.query({
            query: () => ({
                url: `/requests/saved${location.search}`,
                method: "GET",
            }),
            providesTags: ["savedRequest"],
            transformResponse: (response: { data: any }) => response.data,
        }),
    }),
});

export const {
    useGetRequestsQuery,
    useOwnerRequestAnalyticsQuery,
    useGetMyRequestsQuery,
    useGetRequestByIdQuery,
    useGetSavedRequestsQuery,

    useCreateRequestMutation,
    useUpdateRequestMutation,
    useDeleteRequestMutation,
    useSaveRequestMutation,
} = requestApi;