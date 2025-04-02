import express from 'express';
import { addJourney, getJourney } from '../controllers/journey.controller.js';
const router=express.Router();

router.post('/add',addJourney);
router.get('/get',getJourney);


export default router;