

import express from 'express';
import { User_Routes } from '../module/USER/user.route';
import { Person_Routes } from '../module/PERSON/person.route';
import { Auth_Routes } from '../module/AUTH/auth.routes';

const router = express.Router();


const final_routes = [
    {
        path: '/user',
        route: User_Routes
    }, {
        path: '/person',
        route: Person_Routes
    }, {
        path: '/auth',
        route: Auth_Routes
    }
]



final_routes.forEach((one) => router.use(one.path, one.route));
export const Project_Routes = router;