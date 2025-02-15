import { createSlice } from "@reduxjs/toolkit"
const employeeDetailsSlice=createSlice({
    name:"employee_details",
    initialState:{emp_id:"",emp_name:"",emp_email:"",emp_number:"",bb_id:"",gender:"",bb_name:""},
    reducers:{
        values:(state,action)=>{
            console.log("Reduxemp")
            console.log(action.payload)
            state.emp_id=action.payload.emp_id
            state.emp_name=action.payload.emp_name
            state.emp_email=action.payload.emp_email
            state.emp_number=action.payload.emp_number
            state.bb_name=action.payload.bb_name
            state.bb_id=action.payload.bb_id
            state.gender=action.payload.gender
        },
        // update:(state,action)=>{
        //     state.age=action.payload.age
        //     state.patient_num=action.payload.patient_num
        //     state.email=action.payload.email
        //     state.blood_group=action.payload.blood_group

        // }
    }
})

export const employeeDetailsActions=employeeDetailsSlice.actions
export default employeeDetailsSlice