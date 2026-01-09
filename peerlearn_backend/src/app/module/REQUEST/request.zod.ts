import { z } from "zod";



export const Create_Request_Zod_Type = z.object({
    body: z.object({
        req_maker_id: z.string(),
        target_user_id: z.string().optional(),
        title: z.string(),
        message: z.string(),
        is_urgent: z.boolean().optional()
    })
})

export const Update_Request_Zod_Type = z.object({
    body: z.object({
        title: z.string().optional(),
        message: z.string().optional(),
        is_urgent: z.boolean().optional(),
    })
})

export const Update_Request_Status_Zod_Type = z.object({
    body: z.object({
        status: z.enum(['ONGOING', 'ACCEPTED', 'COMPLETED', 'REJECTED']),
        target_user_id: z.string().optional(),
        message: z.string().optional(),
        call_start_at: z.string().optional()
    })
})
