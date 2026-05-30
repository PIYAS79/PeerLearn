import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({ baseUrl: "https://peer-learn-blush.vercel.app/app/v1" }),
    endpoints: () => ({}),
    tagTypes: tagTypesList,
});