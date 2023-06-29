import { configureStore } from "@reduxjs/toolkit";
import countSlice from '../component/countSlice';
const store = configureStore({
    reducer: {
        list: countSlice,
    }
})
export default store;