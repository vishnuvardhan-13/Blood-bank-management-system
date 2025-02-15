import { createSlice } from "@reduxjs/toolkit"
const patientDetailsSlice=createSlice({
    name:"patient_details",
    initialState:{city:"",age:0,blood_group:"",district:"",patient_id:"",email:"",gender:"",patient_num:"",patient_name:"",pincode:0,state:""},
    reducers:{
        values:(state,action)=>{
            console.log("Redux")
            console.log(action.payload)
            state.city=action.payload.city
            state.age=action.payload.age
            state.blood_group=action.payload.blood_group
            state.district=action.payload.district
            state.patient_id=action.payload.patient_id
            state.gender=action.payload.gender
            state.patient_num=action.payload.patient_num
            state.patient_name=action.payload.patient_name
            state.pincode=action.payload.pincode
            state.state=action.payload.state
            state.email=action.payload.email
        },
        update:(state,action)=>{
            state.age=action.payload.age
            state.patient_num=action.payload.patient_num
            state.email=action.payload.email
            state.blood_group=action.payload.blood_group

        }
    }
})

export const patientDetailsActions=patientDetailsSlice.actions
export default patientDetailsSlice