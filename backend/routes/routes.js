import express from 'express';
import { forgotpassword , resetpassword } from '../controller/auth-role.js';
import { authMiddleware } from '../utils/auth-middelware.js';
import {Register} from '../controller/register-control.js'
import {Login, logout} from '../controller/Login-control.js'
import {createProblem, updateProblem, deleteProblem, getAllProblems, getProblemById } from '../controller/problem-crud.js';

const router = express.Router();

router.post('/register', Register)
//router.post('/verify-email', verifyEmail)
router.post('/login', Login)
router.post('/logout', logout)
router.post('/forgot-password', forgotpassword)
router.post('/reset-password/:id/:token', resetpassword)

// Routes for regular users
router.get('/problem', getAllProblems);
router.get('/problem/:id', getProblemById);
// Routes for admin users
router.post('/problem', createProblem);
router.put('/problem/:id', updateProblem);
router.delete('/problem/:id', deleteProblem);


export default router;