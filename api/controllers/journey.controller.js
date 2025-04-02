import Journey from "../models/journey.model.js";
// import { errorHandler } from "../utils/error";

export const addJourney = async (req,res,next)=>{
    const {username, start, end, contactNo, journeyDate, unoccupiedSeats, 
    vehicle, additionalNote, password, startOnMap, endOnMap } = req.body;
    
    const newJourney = new Journey({username, start, end, contactNo, journeyDate, unoccupiedSeats,vehicle, additionalNote, password, startOnMap, endOnMap });

    try {
        await newJourney.save();
        res.status(201).json({message:"Journey added successfully"});
    } catch (error) {
        next(error);
    }
}

// to send the journeys to frontend
export const getJourney = async (req,res,next)=>{

    try {
        const journeys = await Journey.find().sort({ journeyDate: 1 }); 
        res.status(200).json(journeys);
    } catch (error) {
        next(error);
    }
}