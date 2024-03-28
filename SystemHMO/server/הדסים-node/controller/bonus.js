import { memberModel } from "../models/member.js"


function isDateBetween(targetDate, startDate, endDate) {
    let target = new Date(targetDate);
    let start = new Date(startDate);
    let end = new Date(endDate);
    return target >= start && target <= end;
}

export const getNumUsersSickThisMonth = async (req, res) => {
    try {
        let allUsers = await memberModel.find();
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        let lastDayOfLastMonth = new Date(currentYear, currentMonth, 0);
        let numSicksPerDay = new Array(lastDayOfLastMonth.getDate()).fill(0);
        for (let i = 2; i <= lastDayOfLastMonth.getDate(); i++) {
            const dayToCheck = new Date(currentYear, currentMonth - 1, i);
            for (let j = 0; j < allUsers.length; j++) {
                if (allUsers[j].sickDate && allUsers[j].recoveryDate) {
                    const sickDate = new Date(allUsers[j].sickDate);
                    const recoveryDate = new Date(allUsers[j].recoveryDate);
                    if (isDateBetween(dayToCheck, sickDate, recoveryDate)) {
                        numSicksPerDay[i - 2]++;
                    }
                }
            }

        }
        res.json(numSicksPerDay);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }

}
export const getNumMembersNoVaccine=async()=>{
    let cntMembers;
    let allMembers = await memberModel.find();
        for (let i = 0; i < allMembers.length; i++) {
            if (allMembers[i].CoronaVaccines.length != 0) {
                cntMembers++;
            }
        }
    return cntMembers;    
}
