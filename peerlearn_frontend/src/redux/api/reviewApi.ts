import { Get_All_Review_Response_Type } from '@/types';
import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export const reviewApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getAllReviewAsReqMaker: build.query({
            query: (arg: Record<string, any>) => ({
                url: `/review/req_maker/${arg.req_maker_id}`,
                method: 'GET',
                params: arg,
            }),
            transformResponse: (response: Get_All_Review_Response_Type) => {
                return response?.data;
            },
            providesTags: [tagTypes.review],
        }),
        getAllReviewAsTargetUser: build.query({
            query: (arg: Record<string, any>) => ({
                url: `/review/target/${arg.target_user_id}`,
                method: 'GET',
                params: arg,
            }),
            transformResponse: (response: Get_All_Review_Response_Type) => {
                return response?.data;
            },
            providesTags: [tagTypes.review],
        }),
        updateReview: build.mutation({
            query: ({ review_id, data }) => {
                console.log(data);
                return {
                    url: `/review/${review_id}`,
                    method: 'PUT',
                    data,
                };
            },
            invalidatesTags: [tagTypes.review],
        }),
        deleteReview: build.mutation({
            query: (review_id) => ({
                url: `/review/${review_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.review],
        }),
        createReview: build.mutation({
            query: ({ request_id, data }) => {
                console.log(data);
                return {
                    url: `/review/${request_id}`,
                    method: 'POST',
                    data,
                };
            },
            invalidatesTags: [tagTypes.review],
        }),
    }),
});

export const {
    useGetAllReviewAsReqMakerQuery,
    useGetAllReviewAsTargetUserQuery,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useCreateReviewMutation
} = reviewApi;