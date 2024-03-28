import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    arrMembers: []
}

export const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        updateArrMembers: (state, action) => {
            state.arrMembers = action.payload;
            console.log(state.arrMembers)
        },
        deleteFromMembers: (state, action) => {
            state.arrMembers = state.arrMembers.filter((item) => item.id !== action.payload.id);
        },
        addMemberToArr: (state, action) => {
            state.arrMembers.push(action.payload)
        },
        updateOneMember: (state, action) => {
            for (let i = 0; i < state.arrMembers.length; i++) {
                if (state.arrMembers[i].id == action.payload.id) {
                    state.arrMembers[i] = action.payload;
                }
            }
        },
    }
})

export const { updateArrMembers, deleteFromMembers, addMemberToArr, updateOneMember } = memberSlice.actions

export default memberSlice.reducer