import express from 'express';
import Validation_Request from '../../utils/req.validation';
import { Person_Zod_Types } from './person.zod';
import { Person_Controller } from './person.controller';


const router = express.Router();


router.patch('/:id',
    Validation_Request(Person_Zod_Types.Person_Update_Zod_Type),
    Person_Controller.update_person
);

router.get('/',
    Person_Controller.get_all_person
);

router.get('/:id',
    Person_Controller.get_person_by_id
);


export const Person_Routes = router;