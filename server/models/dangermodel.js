import mongoose from 'mongoose';

const dangerPointSchema = new mongoose.Schema({
    _id:{type: mongoose.Schema.ObjectId, auto: true},
    Id: { type: String, required: true, unique: true }, 
    Latitude: { type: Number, required: true },
    Longitude: { type: Number, required: true },
    LocationName: { type: String, required: true },
    Reports: { type: Number, required: true },

    Categories: {
        assault: { type: Number, required: true },
        fraud: { type: Number, required: true },
        burglary: { type: Number, required: true },
        theft: { type: Number, required: true },
        vandalism: { type: Number, required: true }
    },
    FrequentCrime: { type: String, required: true },

    Days: {
        Friday: { type: Number, required: true },
        Monday: { type: Number, required: true },
        Saturday: { type: Number, required: true },
        Sunday: { type: Number, required: true },
        Thursday: { type: Number, required: true },
        Tuesday: { type: Number, required: true },
        Wednesday: { type: Number, required: true }
    },
    NotoriousDay: { type: String, required: true },

    Months: {
        April: { type: Number, required: true },
        August: { type: Number, required: true },
        December: { type: Number, required: true },
        February: { type: Number, required: true },
        January: { type: Number, required: true },
        July: { type: Number, required: true },
        June: { type: Number, required: true },
        March: { type: Number, required: true },
        May: { type: Number, required: true },
        November: { type: Number, required: true },
        October: { type: Number, required: true },
        September: { type: Number, required: true }
    },
    NotoriousMonth: { type: String, required: true },

    CrimeLikelihood: { type: String, required: true },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere' 
        }
    }
});

export default mongoose.model('dangerpoints', dangerPointSchema);
