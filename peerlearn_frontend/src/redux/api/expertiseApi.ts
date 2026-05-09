import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export const expertiseApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({

        updateExpertise: build.mutation({
            query: (arg: Record<string, any>) => ({
                url: `/expertise/${arg.id}`,
                method: 'PATCH',
                data: arg.data,
            }),
            invalidatesTags: [tagTypes.expertise,tagTypes.person],
        }),
        createExpertise: build.mutation({
            query: (arg: Record<string, any>) => ({
                url: `/expertise`,
                method: 'POST',
                data: arg.data,
            }),
            invalidatesTags: [tagTypes.expertise,tagTypes.person],
        }),
        deleteExpertise : build.mutation({
            query: (arg: Record<string, any>) => ({
                url: `/expertise/${arg.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.expertise,tagTypes.person],
        }),

    }),
});

export const {
    useUpdateExpertiseMutation,
    useCreateExpertiseMutation,
    useDeleteExpertiseMutation,
} = expertiseApi;