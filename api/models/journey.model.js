import mongoose from "mongoose";

const journeySchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
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
        index: { expires: '24h' },
    },
    unoccupiedSeats:{
        type:String,
        required:true,
    },
    vehicle:{
        type:String,
        required:true,
    },
    additionalNote:{
        type:String,
        required:true,
    },
    startOnMap:{
        type:String,
        required:true,
    },
    endOnMap:{
        type:String,
        required:true,
    }
},{timestamps:true});

const Journey = mongoose.model('Journey', journeySchema);

export default Journey;