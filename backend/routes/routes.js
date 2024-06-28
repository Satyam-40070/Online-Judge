import express from 'express';
//import { authenticateToken, authorizeRole } from '../controller/auth-role.js';

import {Register} from '../controller/register-control.js'
import {Login, logout} from '../controller/Login-control.js'
import {createProblem, updateProblem, deleteProblem, getAllProblems, getProblemById } from '../controller/problem-crud.js';

const router = express.Router();

router.post('/register', Register)
//router.post('/verify-email', verifyEmail)
router.post('/login', Login)
router.post('/logout', logout)

// Routes for regular users
router.get('/problem'/*, authenticateToken*/, getAllProblems);
router.get('/problem/:id'/*, authenticateToken*/, getProblemById);
// Routes for admin users
router.post('/problem', /*authenticateToken, authorizeRole('admin'),*/ createProblem);
router.put('/problem/:id', /*authenticateToken, authorizeRole('admin'),*/ updateProblem);
router.delete('/problem/:id', /*authenticateToken, authorizeRole('admin'),*/ deleteProblem);


export default router;