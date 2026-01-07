import { z } from "zod";


const User_Login_Zod_Type = z.object({
    body: z.object({
        email: z.string(),
        password: z.string()
    })
})

const Change_Password_Zod_Type = z.object({
    body: z.object({
        old_password: z.string(),
        new_password: z.string()
    })
})

const Forget_Password_Zod_Type = z.object({
    body: z.object({
        email: z.string()
    })
})

const Reset_Password_Zod_Type = z.object({
    body: z.object({
        password: z.string()
    })
})

export const Auth_Zod_Types = {
    User_Login_Zod_Type,
    Change_Password_Zod_Type,
    Forget_Password_Zod_Type,
    Reset_Password_Zod_Type
}