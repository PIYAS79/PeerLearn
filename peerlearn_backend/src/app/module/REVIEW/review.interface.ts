import type { Academic_Courses, Teaching_Category } from "@prisma/client"




export type Create_Review_Type = {
    human_rating: number,
    details: string,
    course_title: Academic_Courses,
    teaching_category: Teaching_Category
    course_code?: string
    topic: string
}

export type Update_Review_Type = {
    details?: string,
    course_title?: Academic_Courses,
    course_code?: string
    topic?: string
}