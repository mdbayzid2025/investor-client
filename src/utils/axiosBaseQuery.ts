import axios, { AxiosError } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

type AxiosBaseQueryArgs = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }): BaseQueryFn<AxiosBaseQueryArgs> =>
  async ({ url, method, body, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data: body,
        headers: headers || { "content-type": "application/json" },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };