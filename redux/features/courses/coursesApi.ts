import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create-course",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: "get-admin-courses",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getCoursesUser: builder.query({
            query: () => ({
                url: "get-courses",
                method: "GET",
            })
        }),
        getSingleCourse: builder.query({
            query: (id) => ({
                url: `get-course/${id}`,
                method: "GET",
            })
        }),
        getCourseContent: builder.query({
            query: (id) => ({
                url: `get-course-content/${id}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        addQuestion: builder.mutation({
            query: ({ question, courseId, contentId }) => ({
                url: "add-question",
                method: "PUT",
                body: { question, courseId, contentId },
                credentials: "include" as const,
            })
        }),
        addAnswer: builder.mutation({
            query: ({ answer, courseId, contentId, questionId }) => ({
                url: "add-answer",
                method: "PUT",
                body: { answer, courseId, contentId, questionId },
                credentials: "include" as const,
            })
        }),
        addReview: builder.mutation({
            query: ({ id, review, rating }) => ({
                url: `add-review/${id}`,
                method: "PUT",
                body: { review, rating },
                credentials: "include" as const,
            })
        }),
        addReplyToReview: builder.mutation({
            query: ({ comment, courseId, reviewId }) => ({
                url: "add-reply",
                method: "PUT",
                body: { comment, courseId, reviewId },
                credentials: "include" as const,
            })
        }),
        getVideoCipherOTP: builder.mutation({
            query: (videoId) => ({
                url: "getVideoCipherOTP",
                method: "POST",
                body: { videoId },
            })
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        editCourse: builder.mutation({
            query: ({id, data}) => ({
                url: `edit-course/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
    })
})

export const { 
    useCreateCourseMutation, 
    useGetAllCoursesQuery, 
    useGetCoursesUserQuery,
    useGetSingleCourseQuery,
    useGetCourseContentQuery,
    useAddQuestionMutation,
    useAddAnswerMutation,
    useAddReviewMutation,
    useAddReplyToReviewMutation,
    useGetVideoCipherOTPMutation,
    useDeleteCourseMutation, 
    useEditCourseMutation 
} = coursesApi;