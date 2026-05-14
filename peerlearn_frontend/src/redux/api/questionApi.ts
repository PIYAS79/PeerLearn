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

    }),
});

export const {
    useCreateQuestionsMutation,
} = requestApi;