import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';
import { Get_All_Request_Response_Type } from '@/types';

export const requestApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({

        getAllRequest: build.query({
            query: (arg: Record<string, any>) => ({
                url: '/request',
                method: 'GET',
                params: arg,
            }),
            transformResponse: (response: Get_All_Request_Response_Type) => {
                return response?.data;
            },
            providesTags: [tagTypes.request],
        }),
        createRequest: build.mutation({
            query: (arg: Record<string, any>) => {
                console.log(arg);
                return ({
                    url: '/request',
                    method: 'POST',
                    data: arg,
                })
            },
            invalidatesTags: [tagTypes.request],
        }),
    }),
});

export const {
    useGetAllRequestQuery,
    useCreateRequestMutation
} = requestApi;