import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';
import { Get_All_Request_Response_Type } from '@/types';
import { get } from 'http';

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
        getMyRequest: build.query({
            query: (arg: Record<string, any>) => ({
                url: `/request/maker/${arg.person_id}`,
                method: 'GET',
                params: arg,
            }),
            transformResponse: (response: Get_All_Request_Response_Type) => {
                return response?.data;
            },
            providesTags: [tagTypes.request],
        }),
        getTargetRequest: build.query({
            query: (arg: Record<string, any>) => ({
                url: `/request/target/${arg.person_id}`,
                method: 'GET',
                params: arg,
            }),
            transformResponse: (response: Get_All_Request_Response_Type) => {
                return response?.data;
            },
            providesTags: [tagTypes.request],
        }),
        updateRequestStatus: build.mutation({
            query: (arg: Record<string, any>) => {
                console.log(arg);
                return ({
                    url: `/request/status/${arg.request_id}`,
                    method: 'PATCH',
                    data: arg,
                })
            },
            invalidatesTags: [tagTypes.request,tagTypes.person],
        }),
        getRequestByCallId: build.query({
            query: (arg: Record<string, any>) => ({
                url: `/request/call/${arg.call_id}`,
                method: 'GET',
                params: arg,
            }),
            transformResponse: (response: any) => {
                return response?.data;
            },
            providesTags: [tagTypes.request],
        }),
         updateMyRequest: build.mutation({
            query: (arg: Record<string, any>) => {
                return ({
                    url: `/request/${arg.request_id}`,
                    method: 'PATCH',
                    data: {
                        message:arg.message,
                        is_urgent:arg.is_urgent
},
                })
            },
            invalidatesTags: [tagTypes.request,tagTypes.person],
        }),
        deleteMyRequest: build.mutation({
            query: (request_id) => ({
                url: `/request/${request_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.request],
        }),
    }),
});

export const {
    useGetAllRequestQuery,
    useCreateRequestMutation,
    useGetMyRequestQuery,
    useGetTargetRequestQuery,
    useUpdateRequestStatusMutation,
    useGetRequestByCallIdQuery,
    useUpdateMyRequestMutation,
    useDeleteMyRequestMutation
} = requestApi;