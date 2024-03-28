import { memberValidator } from "../models/member.js"
import { memberModel } from "../models/member.js"

export const getAllMembers = async (req, res) => {
    try {
        let allMembers = await memberModel.find();
        res.json(allMembers)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
export const getMemberById = async (req, res) => {
    let { id } = req.params;
    if (!id)
        return res.send("הכנס תעודת זהות")
    try {
        let member = await memberModel.findOne({ id })
        if (!member)
            return res.status(404).json({ type: "לא נמצא", message: "לא קיים כזה משתמש" })
        res.json({ member })
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

export const addMember = async (req, res) => {
    let validate = memberValidator(req.body)
    if (validate.error)
        return res.status(400).json({ error: validate.error.details[0].message })
    let { id, firstName, lastName, birthDate, fullAddress, phone, mobilePhone, CoronaVaccines, sickDate, recoveryDate } = req.body;
    try {
        let sameMember = await memberModel.findOne({ id })
        if (sameMember)
            return res.status(409).json({ type: "כפילות", message: "פציינט רשום במערכת" })
        let member = await memberModel.create({ id, firstName, lastName, birthDate, fullAddress, phone, mobilePhone, CoronaVaccines, sickDate, recoveryDate });
        res.json({ member });
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

export const updateMember = async (req, res) => {
    let { id } = req.params
    if (!id)
        return res.send("הכנס תעודת זהות")
    try {
        let member = await memberModel.findOne({ id });
        let memberForUpdate = req.body
        if (memberForUpdate.id && memberForUpdate.id !== id) {
                return res.status(409).json({ type: "שגיאה", message: "לא ניתן לשנות ת.ז" });
        }
        Object.assign(member, memberForUpdate, { overwrite: true });
        let memberObj = member.toObject();
        delete memberObj._id;
        delete memberObj.__v;
        let validate = memberValidator(memberObj)
        if (validate.error)
            return res.status(400).json({ error: validate.error.details[0].message })
        let memberAfterUpdate = await memberModel.findByIdAndUpdate(member._id, memberObj)
        res.json({memberAfterUpdate})
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

export const deleteMember = async (req, res) => {
    let { id } = req.params
    if (!id)
        return res.send("הכנס תעודת זהות")
    try {
        let member = await memberModel.findOne({ id })
        if (!id)
            return res.status(404).json({ type: "לא נמצא", message: "לא קיים כזה משתמש" })
        await memberModel.findByIdAndDelete(member._id)
        res.json({ member })
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}