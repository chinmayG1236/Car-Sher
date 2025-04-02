import Journey from "../models/journey.model.js";
// import { errorHandler } from "../utils/error";

export const addJourney = async (req,res,next)=>{
    const {username, start, end, contactNo, journeyDate, unoccupiedSeats, 
    vehicle, additionalNote, password, startOnMap, endOnMap, driver } = req.body;
    
    const newJourney = new Journey({driver,username, start, end, contactNo, journeyDate, unoccupiedSeats,vehicle, additionalNote, password, startOnMap, endOnMap });

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
        const journeys = await Journey.find().sort({ journeyDate: -1 }); 
        res.status(200).json(journeys);
    } catch (error) {
        next(error);
    }
}

// to add pasenger to a journey
export const addPassenger = async (req,res,next)=>{
    const {journeyId, passengerId,passengerName } = req.body;

    try {
        const journey = await Journey.findById(journeyId);

    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }

    // Update passenger fields
    journey.passenger = passengerId;
    journey.passengerName = passengerName;

    await journey.save();

    res.status(200).json({ message: 'Passenger added to journey successfully' });
    } catch (error) {
        next(error);
    }
}
export const getDriver = async (req, res, next) => {
    const { id } = req.query;
  
    try {
      const driverJourneys = await Journey.find({ driver: id }).sort({ journeyDate: -1 });
      res.status(200).json(driverJourneys);
    } catch (error) {
      next(error);
    }
  };
export const getPassenger = async (req, res, next) => {
    const { id } = req.query;
    try {
      const passengerJourneys = await Journey.find({ passenger: id }).sort({ journeyDate: -1 });
      res.status(200).json(passengerJourneys);
    } catch (error) {
      next(error);
    }
};

