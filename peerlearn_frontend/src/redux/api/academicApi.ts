import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export const academicApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({

        updateAcademicInfo: build.mutation({
            query: (arg: Record<string, any>) => {
                return ({
                url: `/academic/${arg.id}`,
                method: 'PUT',
                data: arg.data,
            })
            },
            invalidatesTags: [tagTypes.academic,tagTypes.person],
        }),

    }),
});

export const {
    useUpdateAcademicInfoMutation
} = academicApi;