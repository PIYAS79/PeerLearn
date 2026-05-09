import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';
import { Get_All_Teachers_Response_Type } from '@/types/teacher_types';

export const teacherApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({

        getAllTeacher: build.query({
            query: (arg: Record<string, any>) => ({
                url: '/person',
                method: 'GET',
                params: arg,
            }),
            transformResponse: (response: Get_All_Teachers_Response_Type) => {
                return response?.data;
            },
            providesTags: [tagTypes.teacher],
        }),
    }),
});

export const {
    useGetAllTeacherQuery
} = teacherApi;