import type { Academic_Courses, Expertise_Level } from "@prisma/client"






export type Create_Expertise_Type = {
    person_id: string,
    course_title: Academic_Courses,
    course_code: string,
    topic: string,
    level: Expertise_Level
}

export type Update_Expertise_Type = {
    course_title?: Academic_Courses,
    course_code?: string,
    topic?: string,
    level?: Expertise_Level
}

