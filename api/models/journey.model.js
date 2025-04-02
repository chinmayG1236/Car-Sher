import mongoose from "mongoose";
import { Schema } from "mongoose";
const journeySchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    start:{
        type: String,
        required: true,
    },
    end:{
        type: String,
        required: true,
    },
    contactNo:{
        type:String,
        required: true,
    },
    journeyDate:{
        type:Date,
        required: true,
    },
    unoccupiedSeats:{
        type:String,
        required:false,
    },
    vehicle:{
        type:String,
        required:false,
    },
    additionalNote:{
        type:String,
        required:false,
    },
    startOnMap:{
        type:String,
        required:false,
    },
    endOnMap:{
        type:String,
        required:false,
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required:false,
    },
    passenger: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required:false,
    },
    passengerName:{
        type:String,
        required:false,
    }
},{timestamps:true});

const Journey = mongoose.model('Journey', journeySchema);

export default Journey;