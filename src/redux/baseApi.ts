import { axiosBaseQuery } from "@/utils/axiosBaseQuery";
import { getBaseUrl } from "@/utils/baseUrl";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: [],
});
