import express, { type NextFunction, type Request, type Response } from 'express';
import { Question_Controllers } from './question.controller';
import { File_Uploader } from '../../utils/file_uploader';
import { Create_Question_Zod_Type } from './question.zod';
import Check_Roles from '../../middlewares/check_role_by_token';
import { User_Role } from '@prisma/client';



const router = express.Router();

router.post('/:req_id',
    File_Uploader.upload.single('file'),
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.TEACHER, User_Role.STUDENT),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = Create_Question_Zod_Type.parse(JSON.parse(req.body.data));
        return Question_Controllers.create_questions(req, res, next);
    }
)

router.get('/:id',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.STUDENT, User_Role.TEACHER),
    Question_Controllers.get_my_questions
)

router.get('/check/:id',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.STUDENT, User_Role.TEACHER),
    Question_Controllers.check_question_and_create_review

)



export const Question_Routes = router;