import { tagTypes } from '../tag-types';
import { baseApi } from './baseApi';

export const requestApi = baseApi.injectEndpoints({
    overrideExisting: true,

    endpoints: (build) => ({
    createQuestions: build.mutation({
    query: ({ id, files, message }) => {
        const formData = new FormData();
        files.forEach((file: File) => {
            formData.append("file", file);
        });
        formData.append(
            "data",
            JSON.stringify({
                prompt: message
            })
        );
        return {
            url: `/question/${id}`,
            method: 'POST',
            data: formData,
        };
    },
    invalidatesTags: [tagTypes.questions],
}),
    getMyQuestions: build.query({
            query: (arg: Record<string, any>) => ({
                url: `/question/${arg.request_id}`,
                method: 'GET',
                params: arg,
            }),
            transformResponse: (response: any) => {
                return response?.data;
            },
            providesTags: [tagTypes.questions],
     }),
    checkMyAnsware: build.mutation({
                query: (arg: Record<string, any>) => {
                    console.log(arg.ans)
                    return ({
                        url: `/question/check/${arg.request_id}`,
                        method: 'POST',
                        data: arg.ans,
                    })
                },
                invalidatesTags: [tagTypes.questions],
            }),

    }),
});

export const {
    useCreateQuestionsMutation,
    useGetMyQuestionsQuery,
    useCheckMyAnswareMutation
} = requestApi;