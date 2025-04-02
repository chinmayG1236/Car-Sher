import express from 'express';
import { addJourney, addPassenger, getDriver, getJourney, getPassenger } from '../controllers/journey.controller.js';
const router=express.Router();

router.post('/add',addJourney);
router.get('/get',getJourney);
router.post('/addPassenger',addPassenger);
router.get('/get-driver',getDriver);
router.get('/get-passenger',getPassenger);

export default router;