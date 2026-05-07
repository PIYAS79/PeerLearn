import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';
import { Get_All_Request_Response_Type, Request_Data_Type } from '@/types';

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
                console.log(response);
                return response?.data;
            },
            providesTags: [tagTypes.request],
        })
    }),
});

export const {
    useGetAllRequestQuery
} = requestApi;