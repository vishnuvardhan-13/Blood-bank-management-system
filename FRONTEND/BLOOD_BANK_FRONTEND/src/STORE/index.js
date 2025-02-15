import { configureStore } from "@reduxjs/toolkit";
import detailsSlice from "./storeDetails";
import patientDetailsSlice from "./patientDetails";
import bloodBankDetailsSlice from "./bloodBankDetails";
import employeeDetailsSlice from "./employeeDetails";

const detailsStore=configureStore({
    reducer:{
        details:detailsSlice.reducer,
        patient_details:patientDetailsSlice.reducer,
        blood_bank_details:bloodBankDetailsSlice.reducer,
        employee_details:employeeDetailsSlice.reducer,

    }
})
export default detailsStore;