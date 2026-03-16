import Cookies from "js-cookie";
import { baseApi } from "../baseApi";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFeedbacks: build.query({
      query: () => ({
        url: `/feedback/user`,
        method: "GET",
      }),
      providesTags: ["feedback"],
    }),

    getFeedbackById: build.query({
      query: (id: string) => ({
        url: `/feedback/${id}`,
        method: "GET",
      }),
      providesTags: ["feedback"],
      transformResponse: (response: { data: any }) => response.data,
    }),

    createFeedback: build.mutation({
      query: (data) => ({
        url: "/feedback",
        method: "POST",
        body: data,       
      }),
      invalidatesTags: ["feedback"],
    }),

    updateFeedback: build.mutation({
      query: (data) => ({
        url: `/feedback/update/${data?.id}`,
        method: "PUT",
        body: data,       
      }),
      invalidatesTags: ["feedback"],
    }),

    deleteFeedback: build.mutation({
      query: (id: string) => ({
        url: `/feedback/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }),
      invalidatesTags: ["feedback"],
    }),
  }),
});

export const {
  useGetFeedbacksQuery,
  useGetFeedbackByIdQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;