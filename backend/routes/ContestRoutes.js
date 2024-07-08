import express from 'express';
const router2 = express.Router();
import { addContestProblem, allContestProblem, allContestProblembyId } from '../controller/ContestController.js';

router2.post('/addContestProblem', addContestProblem)
router2.get('/allContestProblem',allContestProblem)
router2.get('/allContestProblembyId/:id',allContestProblembyId)
router2.get('/solvedproblems',allContestProblembyId)

export default router2;