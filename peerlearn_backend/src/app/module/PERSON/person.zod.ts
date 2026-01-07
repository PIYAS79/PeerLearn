import z from "zod";
import { Person_Role_Type } from "./person.interface";




const Person_Create_Zod_Type = z.object({
    body: z.object({
        email: z.string(),
        password: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        role: z.nativeEnum(Person_Role_Type).optional()
    })
})

const Admin_Create_Zod_Type = z.object({
    body: z.object({
        email: z.string(),
        password: z.string(),
        first_name: z.string(),
        last_name: z.string(),
    })
})

const Person_Update_Zod_Type = z.object({
    body: z.object({
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        photo_url: z.string().optional(),
        bkash: z.string().optional(),
    })
})

export const Person_Zod_Types = {
    Person_Create_Zod_Type,
    Person_Update_Zod_Type,
    Admin_Create_Zod_Type
}