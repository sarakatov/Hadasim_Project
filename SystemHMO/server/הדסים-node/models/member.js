import mongoose from "mongoose";
import Joi from 'Joi';


const vaccineSchema = mongoose.Schema({
    date: { type: Date, required: true },
    manufacturer: { type: String, required: true, match: /^[A-Za-zא-ת\s]+$/ }
}, { _id: false });

const memberSchema = mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    fullAddress: {
        city: String,
        street: String,
        numHouse: Number
    },
    birthDate: Date,
    phone: String,
    mobilePhone: String,
    CoronaVaccines: [vaccineSchema],
    sickDate: Date,
    recoveryDate: Date
})

export const memberModel = mongoose.model("users", memberSchema);
 
const vaccineValidationSchema = Joi.object({
    date: Joi.date().required(),
    manufacturer: Joi.string().required().valid("Pfizer", "Moderna", "AstraZeneca", "Johnson & Johnson")
});


export const memberValidator = (member) => {
    const schema = Joi.object({
        id: Joi.string().required().length(9).pattern(/^[0-9]+$/),
        firstName: Joi.string().required().min(2).max(20).pattern(/^[a-zA-Zא-ת ]+$/),
        lastName: Joi.string().required().min(2).max(20).pattern(/^[a-zA-Zא-ת ]+$/),
        fullAddress: Joi.object({
            city: Joi.string().pattern(/^[א-תA-Za-za-t\s]+$/).min(3).max(15).required(),
            street: Joi.string().pattern(/^[א-תA-Za-za-t0-9\s]+$/).min(3).required(),
            numHouse: Joi.number().required()
        }).required(),
        birthDate: Joi.date().max(Date.now()).required(),
        phone: Joi.string().min(9).max(9).pattern(/^[0-9]{9}$/),
        mobilePhone: Joi.string().pattern(/^[0-9]{10}$/).min(10).max(10),
        CoronaVaccines: Joi.array().items(vaccineValidationSchema).max(4),
        sickDate: Joi.date().when('recoveryDate', {
            is: Joi.exist(),
            then: Joi.required(),
        }),
        recoveryDate:Joi.date()
    }).custom((value, helpers) => {
        if (!value.phone && !value.mobilePhone) {
            return helpers.message({ custom: 'חובה מספר טלפון אחד לפחות' });
        }
        if (value.recoveryDate && value.sickDate && value.recoveryDate <= value.sickDate) {
            return helpers.message({ custom: 'תאריך החלמה חייב להיות לאחר תאריך חולי' });
        }
        return value;
         
    }, 'custom validation')   
    return schema.validate(member);
}