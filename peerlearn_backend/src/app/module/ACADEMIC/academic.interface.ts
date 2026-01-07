import type { Academic_Deprartment, Academic_Level, Academic_Term } from "@prisma/client"



export type Update_Academic_Info_Type = {
    person_id: string,
    student_id: string,
    university: string,
    department: Academic_Deprartment,
    level: Academic_Level,
    term: Academic_Term
}
