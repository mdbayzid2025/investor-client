import { baseApi } from "../baseApi";
import Cookies from "js-cookie";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 1️⃣ Get chat list (users / conversations)
    getMyConversation: build.query({
      query: (id) => ({
        url: `/chat/request/${id}/my-conversation`,
        method: "GET",
      }),
      providesTags: ["chat"],
    }),

    getOwnerConversation: build.query({
      query: (id) => ({
        url: `/chat/owner/conversations?postId=${id}`,
        method: "GET",
      }),
      providesTags: ["chat"],
    }),

    // 2️⃣ Get messages by chatId
    getMessages: build.query<any, string>({
      query: (chatId) => ({
        url: `/messages/${chatId}`,
        method: "GET",        
      }),   
      transformResponse: (res:any)=> res?.data,
      providesTags: ["messages"]
    }),

    // 3️⃣ Send message
    sendMessage: build.mutation({
      query: ({id, payload}) => ({
        url: `/messages/${id}`,
        method: "POST",
        body: payload,
        headers: {
            "Authorization" : `Bearer ${Cookies?.get("accessToken")}`
        },
      }),
      // providesTags: ["messages", "chat"]
       invalidatesTags: ["messages", "chat"],
    }),

    // 4️⃣ Create new chat
    createChat: build.mutation({
      query: (data) => ({
        url: `/chat/request/${data?.id}/start`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chat"],
    }),
  }),
});

export const {
  useGetMyConversationQuery,
  useGetOwnerConversationQuery,

  useGetMessagesQuery,
  useSendMessageMutation,
  useCreateChatMutation,
} = chatApi;