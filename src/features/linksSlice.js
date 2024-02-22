import { createSlice } from "@reduxjs/toolkit";
import Customize from "../components/Customize";
import ProfileDetails from "../components/ProfileDetails";


  

const initialState= {
    fields:   [{
        selectValue: '',
        textValue: ''
     }],
}

const linksSlice= createSlice({
    name: 'links',
    initialState,
    reducers: {
        addField: (state, action)=> {
            state.fields.push({selectValue: '', textValue: ''})
        },
        removeField: (state, action)=> {
            state.fields.splice(action.payload, 1)
        },
        setSelectValue: (state, action)=> {
            const { index, selectValue }= action.payload
            state.fields[index].selectValue= selectValue
        },
        setTextValue: (state, action)=> {
            const { index, textValue }= action.payload
            state.fields[index].textValue= textValue
        },
        updateFields: (state, action) => {
            state.fields = action.payload;
        },
        dragEnd: (state, action) => {
            const { source, destination } = action.payload;
            if (!destination) return;
            const tasks = [...state.fields];
            const [reorderedItem] = tasks.splice(source.index, 1);
            tasks.splice(destination.index, 0, reorderedItem);
            state.fields = tasks;
        }
    }
})


export const {addField, removeField, setSelectValue, setTextValue, dragEnd, setPage, updateFields}= linksSlice.actions
export const selectAllFields=  (state)=> state.links.fields

export default linksSlice.reducer 