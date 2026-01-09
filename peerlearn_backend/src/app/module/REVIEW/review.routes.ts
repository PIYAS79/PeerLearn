import express from 'express';
import Validation_Request from '../../utils/req.validation';
import Check_Roles from '../../middlewares/check_role_by_token';
import { User_Role } from '@prisma/client';
import { Review_Controllers } from './review.controller';
import { Create_Review_Zod_Type, Update_Review_Zod_Type } from './review.zod';




const router = express.Router();

router.post('/:id',
    Check_Roles(User_Role.ADMIN, User_Role.STUDENT, User_Role.TEACHER, User_Role.SUPERADMIN),
    Validation_Request(Create_Review_Zod_Type),
    Review_Controllers.create_review
)

router.put('/:id',
    Check_Roles(User_Role.ADMIN, User_Role.STUDENT, User_Role.TEACHER, User_Role.SUPERADMIN),
    Validation_Request(Update_Review_Zod_Type),
    Review_Controllers.update_review
)
router.delete('/:id',
    Check_Roles(User_Role.ADMIN, User_Role.STUDENT, User_Role.TEACHER, User_Role.SUPERADMIN),
    Review_Controllers.delete_review
)

router.get('/req_maker/:id',
    Check_Roles(User_Role.ADMIN, User_Role.STUDENT, User_Role.TEACHER, User_Role.SUPERADMIN),
    Review_Controllers.get_all_review_as_req_maker
)

router.get('/target/:id',
    Check_Roles(User_Role.ADMIN, User_Role.STUDENT, User_Role.TEACHER, User_Role.SUPERADMIN),
    Review_Controllers.get_all_review_as_target_user
)

router.get('/',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN),
    Review_Controllers.get_all_review
)


export const Review_Routes = router;