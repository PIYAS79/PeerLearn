import express from 'express';
import Validation_Request from '../../utils/req.validation';
import { Create_Expertise_Zod_Type } from './expertise.zod';
import { Expertise_Controllers } from './expertise.controller';
import Check_Roles from '../../middlewares/check_role_by_token';
import { User_Role } from '@prisma/client';


const router = express.Router();


router.post('/',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.STUDENT, User_Role.TEACHER),
    Validation_Request(Create_Expertise_Zod_Type),
    Expertise_Controllers.create_expertise
);

router.get('/:id',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.STUDENT, User_Role.TEACHER),
    Expertise_Controllers.get_all_expertise_of_person
);

router.patch('/:id',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.STUDENT, User_Role.TEACHER),
    Expertise_Controllers.update_expertise
);

router.delete('/:id',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.STUDENT, User_Role.TEACHER),
    Expertise_Controllers.delete_expertise
);


export const Expertise_Routes = router;