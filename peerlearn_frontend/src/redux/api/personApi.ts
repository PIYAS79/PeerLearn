import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';
import { Person_Data_Response_Type } from '@/types';

export const personApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({

        getMe: build.query({
            query: (arg: Record<string, any>) => ({
                url: `/person/${arg.email}`,
                method: 'GET',
                params: arg,
            }),
            transformResponse: (response: Person_Data_Response_Type) => {
                console.log(response);
                return response?.data;
            },
            providesTags: [tagTypes.person],
        })
    }),
});

export const {
    useGetMeQuery,
} = personApi;