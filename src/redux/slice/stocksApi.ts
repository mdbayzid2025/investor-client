import Cookies from "js-cookie";
import { baseApi } from "../baseApi";

const stocksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStocks: build.query({
            query: () => ({
                url: `/stocks${location.search}`,
                method: "GET",
            }),
            providesTags: ["stock"],
        }),
        ownerStockAnalytics: build.query({
            query: () => ({
                url: `/stocks/stock/analysis${location.search}`,
                method: "GET",
            }),
            providesTags: ["stock"],
        }),
        getMyStocks: build.query({
            query: () => ({
                url: `/stocks/my-stocks${location.search}`,
                method: "GET",
            }),
            providesTags: ["stock"],
        }),
        getStockById: build.query({
            query: (id: string) => ({
                url: `/stocks/single/${id}`,
                method: "GET",
            }),
            providesTags: ["stock"],
            transformResponse: (response: { data: any }) => response.data,
        }),
        createStock: build.mutation({
            query: (data) => ({
                url: "/stocks/create",
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                }
            }),
            invalidatesTags: ["stock"],
        }),
        updateStock: build.mutation({
            query: ({ id, payload }) => ({
                url: `/stocks/update/${id}`,
                method: "PATCH",
                body: payload,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            }),
            invalidatesTags: ["stock"],
        }),
        deleteStock: build.mutation({
            query: (id: string) => ({
                url: `/stocks/delete/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            }),
            invalidatesTags: ["stock"],
        }),
    }),
});

export const {
    useGetStocksQuery,
    useOwnerStockAnalyticsQuery,
    useGetMyStocksQuery,
    useGetStockByIdQuery,

    useCreateStockMutation,
    useUpdateStockMutation,
    useDeleteStockMutation,
} = stocksApi;