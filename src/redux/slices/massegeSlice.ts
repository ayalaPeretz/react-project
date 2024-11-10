import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Item } from '../../models/Item.model';
// דוגמא ליצירת מחלקה בחנות

const massegeSlice = createSlice({
    initialState: {
        massage: {
            title: "",
            body: "",
        },
        openModal: false
    },

    //שם המחלקה
    name: 'massegeSlice',
    //רשימת פונקציות לעדכון הסטייט של המחלקה
    reducers: {
        openModal: (state: any,action: PayloadAction<{ title: string, body: string }>) => {
            debugger
            const { title, body } = action.payload;
            state.openModal=true
            state.massage= {
                title: title,
                body: body,
            }
           
        },

        closeModal: (state: any) => {
            state.openModal=false
         }



    }
})
export default massegeSlice.reducer
export const {closeModal,openModal } = massegeSlice.actions

