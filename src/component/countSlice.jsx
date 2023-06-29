import {createSlice} from "@reduxjs/toolkit";
const countSlice = createSlice({
    name:"count",
    initialState:[
        
    ],
    reducers:{
        deletes(state,action){
           return state.filter((item)=>{
                return item.id!== action.payload ;
            })
        },edit(state,action){
            return state.map((task) => {
                if (task.id === action.payload.id) {
                    return action.payload
                } else {
                    return task
                }
            })
        },
        add(state,action){
            console.log(action.payload)
            return[...state,action.payload];
        }
    }
})
export const{deletes,add, edit}=countSlice.actions;
export default countSlice.reducer;