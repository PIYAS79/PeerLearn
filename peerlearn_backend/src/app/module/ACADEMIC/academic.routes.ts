import express from 'express';
import Validation_Request from '../../utils/req.validation';
import Check_Roles from '../../middlewares/check_role_by_token';
import { User_Role } from '@prisma/client';
import { Academic_Controllers } from './academic.controller';
import { Update_Academic_Info_Zod_Type } from './academic.zod';


const router = express.Router();


// if info not found then create else update academic info
router.put('/:id',
    Check_Roles(User_Role.SUPERADMIN, User_Role.ADMIN, User_Role.TEACHER, User_Role.STUDENT),
    Validation_Request(Update_Academic_Info_Zod_Type),
    Academic_Controllers.update_acedimic_info
)

export const Academic_Routes = router;