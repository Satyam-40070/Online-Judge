import express from 'express';
import {Register} from '../controller/register-control.js'
import {Login, logout} from '../controller/Login-control.js'

const router = express.Router();

router.post('/register', Register)
router.post('/login', Login)
router.post('/logout', logout)


export default router;