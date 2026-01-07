import express from 'express';
import { User_Controller } from './user.controller';
import Validation_Request from '../../utils/req.validation';
import { Person_Zod_Types } from '../PERSON/person.zod';
import Check_Roles from '../../middlewares/check_role_by_token';
import { User_Role } from '@prisma/client';


const router = express.Router();


router.post('/person',
    Validation_Request(Person_Zod_Types.Person_Create_Zod_Type),
    User_Controller.create_person
);

router.post('/admin',
    Check_Roles(User_Role.SUPERADMIN),
    Validation_Request(Person_Zod_Types.Admin_Create_Zod_Type),
    User_Controller.create_admin
);

router.delete('/:id',
    Check_Roles(User_Role.SUPERADMIN,User_Role.ADMIN,User_Role.STUDENT,User_Role.TEACHER),
    User_Controller.delete_person_and_user
);


export const User_Routes = router;