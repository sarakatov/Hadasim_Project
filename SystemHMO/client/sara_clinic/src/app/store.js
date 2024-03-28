import { configureStore } from '@reduxjs/toolkit'
import memberReducer from '../features/member/memberSlice'
 
export const store = configureStore({
    reducer: {
        member: memberReducer
    }
})