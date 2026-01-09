import { Academic_Courses, Teaching_Category } from '@prisma/client';
import { z } from 'zod';


export const Create_Review_Zod_Type = z.object({
    body: z.object({
        human_rating: z.number(),
        details: z.string(),
        course_title: z.nativeEnum(Academic_Courses),
        teaching_category: z.nativeEnum(Teaching_Category),
        course_code: z.string().optional(),
        topic: z.string()
    })
})

export const Update_Review_Zod_Type = z.object({
    body: z.object({
        details: z.string().optional(),
        course_title: z.nativeEnum(Academic_Courses).optional(),
        course_code: z.string().optional(),
        topic: z.string().optional()
    })
})

