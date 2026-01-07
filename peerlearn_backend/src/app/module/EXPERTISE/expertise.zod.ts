import { Academic_Courses, Expertise_Level } from "@prisma/client";
import { z } from "zod";




export const Create_Expertise_Zod_Type = z.object({
    body: z.object({
        person_id: z.string(),
        course_title: z.nativeEnum(Academic_Courses),
        course_code: z.string(),
        topic: z.string(),
        level: z.nativeEnum(Expertise_Level)
    })
})

export const Update_Expertise_Zod_Type = z.object({
    body: z.object({
        course_title: z.nativeEnum(Academic_Courses).optional(),
        course_code: z.string().optional(),
        topic: z.string().optional(),
        level: z.nativeEnum(Expertise_Level).optional()
    })
})