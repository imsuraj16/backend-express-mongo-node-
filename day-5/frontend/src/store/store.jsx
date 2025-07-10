import {configureStore} from "@reduxjs/toolkit"
import noteSlice from "./reducers/noteSlice"


export const store = configureStore({
    reducer : {
        note : noteSlice
    }
})