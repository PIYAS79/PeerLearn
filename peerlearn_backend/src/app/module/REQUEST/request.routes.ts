import express from 'express';
import Validation_Request from '../../utils/req.validation';
import Check_Roles from '../../middlewares/check_role_by_token';
import { User_Role } from '@prisma/client';
import { Create_Request_Zod_Type, Update_Request_Zod_Type } from './request.zod';
import { Request_Controllers } from './request.controller';


const router = express.Router();


router.post('/',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.STUDENT, User_Role.TEACHER),
    Validation_Request(Create_Request_Zod_Type),
    Request_Controllers.create_request
);

router.patch('/:id',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.STUDENT, User_Role.TEACHER),
    Validation_Request(Update_Request_Zod_Type),
    Request_Controllers.update_request
);

router.get('/maker/:id',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.STUDENT, User_Role.TEACHER),
    Request_Controllers.get_requests_as_request_maker
);

router.get('/target/:id',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.STUDENT, User_Role.TEACHER),
    Request_Controllers.get_requests_as_target_user
);

router.delete('/:id',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.STUDENT, User_Role.TEACHER),
    Request_Controllers.delete_request
);

router.get('/',
    Check_Roles(User_Role.ADMIN, User_Role.SUPERADMIN, User_Role.STUDENT, User_Role.TEACHER),
    Request_Controllers.get_all_requests
);


export const Request_Routes = router;