import { Academic_Deprartment, Academic_Level, Academic_Term } from "@prisma/client"
import { z } from "zod";





export const Update_Academic_Info_Zod_Type = z.object({
    body: z.object({
        person_id: z.string(),
        student_id: z.string(),
        university: z.string(),
        department: z.nativeEnum(Academic_Deprartment),
        level: z.nativeEnum(Academic_Level),
        term: z.nativeEnum(Academic_Term)
    })
})