import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { updateMember } from "./memberApi";
import { useDispatch } from "react-redux";
import { joiResolver } from '@hookform/resolvers/joi';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Joi from "joi";
import Select from '@mui/material/Select';
import { Button } from "@mui/base";
import { updateOneMember } from "./memberSlice";
const UpdateMember = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()
    let members = useSelector((state) => state.member.arrMembers)
    let { id } = useParams()
    let member = members.find(v => v.id == id);
    const dispatch = useDispatch()
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const vaccineValidationSchema = Joi.object({
        date: Joi.date().max(endOfDay).required().messages({
            'date.max': 'תאריך חייב להיות קטן מהיום*',
            'date.base': 'שדה חובה*',
        }),
        manufacturer: Joi.string().valid("Pfizer", "Moderna", "AstraZeneca", "Johnson & Johnson").required().messages({
            'any.only': 'שדה חובה*',
            'any.required': 'שדה חובה*',
        })
    });
    const schema = Joi.object({
        id: Joi.string().required().length(9).pattern(/^[0-9]+$/).messages({
            'string.empty': 'שדה חובה*',
            'string.pattern.base': 'רק ספרות',
            'string.length': 'לא תקין'
        }),
        firstName: Joi.string().required().min(2).max(20).pattern(/^[a-zA-Zא-ת ]+$/).messages({
            'string.empty': 'שדה חובה*',
            'string.pattern.base': 'הכנס טקסט בלבד',
            'string.min': 'השם צריך להיות לפחות 2 תווים',
            'string.max': 'השם צריך להיות עד 20 תווים',
        }),
        lastName: Joi.string().required().min(2).max(20).pattern(/^[a-zA-Zא-ת ]+$/).messages({
            'string.empty': 'שדה חובה*',
            'string.pattern.base': 'הכנס טקסט בלבד',
            'string.min': 'השם צריך להיות לפחות 2 תווים',
            'string.max': 'השם צריך להיות עד 20 תווים',
        }),
        fullAddress: Joi.object({
            city: Joi.string().pattern(/^[א-תA-Za-za-t\s]+$/).min(3).max(15).required().messages({
                'string.empty': 'שדה חובה*',
                'string.pattern.base': 'הכנס טקסט בלבד',
                'string.min': "אורך מינימלי הוא 3 תווים",
                'string.max': "אורך מקסימלי הוא 15 תווים",
            }),
            street: Joi.string().pattern(/^[א-תA-Za-za-t0-9\s]+$/).min(3).required().messages({
                'string.empty': 'שדה חובה*',
                'string.pattern.base': 'תו לא מורשה',
                'string.min': "אורך מינימלי הוא 3 תווים",
            }),
            numHouse: Joi.number().required().messages({
                'any.required': 'שדה חובה*',

            })
        }).required(),
        birthDate: Joi.date().max(endOfDay).required().messages({
            'date.max': 'תאריך חייב להיות קטן או שווה להיום*',
            'date.base': 'שדה חובה*',
        }),
        phone: Joi.string().length(9).allow('').pattern(/^[0-9]{9}$/).messages({
            'string.pattern.base': 'מספר לא תקין',
            'string.length': 'אורך לא תקין'
        }),
        mobilePhone: Joi.string().allow('').pattern(/^[0-9]{10}$/).length(10).messages({
            'string.pattern.base': 'מספר לא תקין',
            'string.length': 'אורך לא תקין'
        }),
        CoronaVaccines: Joi.array().items(vaccineValidationSchema).max(4).messages({

        }),
        sickDate: Joi.date().max(endOfDay).optional().allow('').when('recoveryDate', {
            is: Joi.exist(),
            then: Joi.required(),
        }).messages({
            'date.max': 'תאריך חייב להיות קטן או שווה להיום*',
            'any.required': 'חובה לספק תאריך החלה אם יש תאריך החלמה'
        }),
        recoveryDate: Joi.date().max(endOfDay).optional().allow('').messages({
            'date.max': 'תאריך חייב להיות קטן או שווה להיום*',
        }).custom((value, helpers) => {
            if (!value)
                return value;
            const sickDateValue = helpers.state.ancestors[0].sickDate;
            if (!sickDateValue) return value;
            if (new Date(value) <= new Date(sickDateValue)) {
                return helpers.message({ custom: '*תאריך החלמה חייב להיות לאחר תאריך חולי' });
            }
            return value;
        }, 'custom validation')
    });
    const manufacturers = [{ value: 'Pfizer', label: 'Pfizer', }, { value: "Moderna", label: "Moderna", },
    { value: "AstraZeneca", label: "AstraZeneca", }, { value: "Johnson & Johnson", label: "Johnson & Johnson", },];

    const { register, control, watch, handleSubmit, formState: { errors, isValid }, setError, clearErrors } = useForm({
        resolver: joiResolver(schema),
        defaultValues: {
            id: member.id,
            firstName: member.firstName,
            lastName: member.lastName,
            fullAddress:
            {
                city: member.fullAddress.city,
                street: member.fullAddress.street,
                numHouse: member.fullAddress.numHouse
            },
            birthDate: new Date(member.birthDate).toISOString().split('T')[0],
            phone: member.phone,
            mobilePhone: member.mobilePhone,
            sickDate: member.sickDate ? new Date(member.sickDate).toISOString().split('T')[0] : '',
            recoveryDate: member.recoveryDate ? new Date(member.recoveryDate).toISOString().split('T')[0] : '',
            CoronaVaccines: member.CoronaVaccines ? member.CoronaVaccines.map(vaccine => ({
                date: new Date(vaccine.date).toISOString().split('T')[0],
                manufacturer: vaccine.manufacturer
            })) : []
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "CoronaVaccines"
    });
    const updateUserInArrr = async (data) => {
        try {
            if (data.phone == "" && data.mobilePhone == "") {
                setError("phone", { type: "manual", message: "נדרש לפחות מספר טלפון אחד" });
                return;
            }
            if (data.phone == "" && data.mobilePhone != "")
                delete data.phone;
            if (data.phone != "" && data.mobilePhone == "")
                delete data.mobilePhone;
            if (data.recoveryDate && !data.sickDate) {
                setError("sickDate", { type: "manual", message: '*חובה תאריך חולי' })
                return;
            }
            if (data.sickDate == "")
                delete data.sickDate;
            if (data.recoveryDate == "")
                delete data.recoveryDate;
            let newMember = await updateMember(data, member.id)
            if (newMember) {
                dispatch(updateOneMember(data))
            }
            console.log('עדכן')
            navigate('/')

        }
        catch (err) {
            if (err.response && err.response.status === 409) {
                setErrorMessage('משתמש קיים');
            }
            else {
                setErrorMessage('לא ניתן לעדכן נסה שוב מאוחר יותר');
            }
        }
    }
    return (
        <form dir="rtl" onSubmit={handleSubmit(updateUserInArrr)}>
            <div style={{ width: '50%', marginRight: '24%', marginTop: '6%', border: '1px solid black', borderRadius: '10px' }}>
                <Box  sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                    noValidate
                    autoComplete="off"
                >
                    <p style={{ textAlign: 'center' }}>טופס עדכון חבר</p>
                    <div sx={{ display: 'flex', padding: '2%', width: '100%' }}>
                        <TextField
                            label="תעודת זהות"
                            type="text"
                            {...register("id")}
                            error={Boolean(errors.id)}
                            helperText={errors.id ? errors.id.message : ''}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                readOnly: true,
                            }}/>
                        <TextField
                            label="שם פרטי"
                            type="text"
                            {...register("firstName")}
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName ? errors.firstName.message : ''}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        <TextField
                            label="שם משפחה"
                            type="text"
                            {...register("lastName")}
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName ? errors.lastName.message : ''}
                            InputLabelProps={{
                                shrink: true,
                            }} /></div>
                    <div sx={{ display: 'flex', padding: '2%', width: '100%' }}>
                        <TextField
                            label="טלפון"
                            type="text"
                            {...register("phone")}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone ? errors.phone.message : ''}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        <TextField
                            label="פלאפון נייד"
                            type="text"
                            {...register("mobilePhone")}
                            error={Boolean(errors.mobilePhone)}
                            helperText={errors.mobilePhone ? errors.mobilePhone.message : ''}
                            InputLabelProps={{
                                shrink: true,
                            }} /></div>
                    <div sx={{ display: 'flex', padding: '2%', width: '100%' }}>
                        <TextField
                            label="עיר"
                            type="text"
                            {...register("fullAddress.city")}
                            error={Boolean(errors.fullAddress)}
                            helperText={errors.fullAddress && errors.fullAddress.city ? errors.fullAddress.city.message : ''}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        <TextField
                            label="רחוב"
                            type="text"
                            {...register("fullAddress.street")}
                            error={Boolean(errors.fullAddress)}
                            helperText={errors.fullAddress && errors.fullAddress.street ? errors.fullAddress.street.message : ''}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        <TextField
                            label="מספר בית"
                            type="Number"
                            {...register("fullAddress.numHouse")}
                            error={Boolean(errors.fullAddress)}
                            helperText={errors.fullAddress && errors.fullAddress.numHouse ? errors.fullAddress.numHouse.message : ''}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </div>
                    <TextField
                        label="תאריך לידה"
                        type="date"
                        error={Boolean(errors.birthDate)}
                        helperText={errors.birthDate ? errors.birthDate.message : ''}
                        {...register("birthDate")}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <br></br>
                    <label>חיסוני Covid19</label>
                    {fields.map((item, index) => (
                        <div key={item.id}>
                            <TextField
                                label="תאריך קבלה"
                                type="date"
                                {...register(`CoronaVaccines[${index}].date`)}
                                error={Boolean(errors.CoronaVaccines?.[index]?.date)}
                                helperText={errors.CoronaVaccines?.[index]?.date ? errors.CoronaVaccines[index].date.message : ''}
                                InputLabelProps={{ shrink: true }}/>
                            <Controller
                                name={`CoronaVaccines[${index}].manufacturer`}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="יצרן"
                                        error={Boolean(errors.CoronaVaccines?.[index]?.manufacturer)}
                                        helperText={errors.CoronaVaccines?.[index]?.manufacturer?.message}
                                        InputLabelProps={{ shrink: true }}>
                                        {manufacturers.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}/>
                            <button type="button" onClick={() => remove(index)}>הסר חיסון</button>
                        </div>
                    ))}
                    {fields.length < 4 && <Button variant="contained" sx={{ bgcolor: 'red' }} onClick={() => append({ date: '', manufacturer: '' })}>הוסף חיסון</Button>}
                    <div sx={{ display: 'flex', padding: '2%', width: '100%' }}>
                        <br></br><label>עבר מחלת הקורונה</label>
                        <br></br>
                        <TextField
                            label="תאריך חולי"
                            type="date"
                            error={Boolean(errors.sickDate)}
                            helperText={errors.sickDate ? errors.sickDate.message : ''}
                            {...register("sickDate",)}
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                        <TextField
                            label="תאריך החלמה"
                            type="date"
                            {...register("recoveryDate")}
                            error={Boolean(errors.recoveryDate)}
                            helperText={errors.recoveryDate ? errors.recoveryDate.message : ''}
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                    </div>
                </Box>
                {errors.phones && <Alert severity="error" sx={{ bgcolor: 'white' }}>{errors.phones.message}</Alert>}
                {errorMessage && <Alert severity="error" sx={{ bgcolor: 'white' }}> {errorMessage}</Alert>}
                <input type="submit" style={{ marginRight: '48%' }} />
                <br></br><br></br>
            </div>
        </form>
    );
}
export default UpdateMember;