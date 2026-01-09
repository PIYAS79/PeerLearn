import { z } from 'zod';


export const Create_Question_Zod_Type = z.object({
    prompt: z.string().optional()
})