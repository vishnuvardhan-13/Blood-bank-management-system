import { createSlice } from "@reduxjs/toolkit"
const detailsSlice=createSlice({
    name:"details",
    initialState:{address:"",age:0,blood_group:"",district:"",donor_id:"",email:"",father_name:"",gender:"",mobile:"",name:"",pincode:0,state:""},
    reducers:{
        values:(state,action)=>{
            state.address=action.payload.address
            state.age=action.payload.age
            state.blood_group=action.payload.blood_group
            state.district=action.payload.district
            state.donor_id=action.payload.donor_id
            state.father_name=action.payload.father_name
            state.gender=action.payload.gender
            state.mobile=action.payload.mobile
            state.name=action.payload.name
            state.pincode=action.payload.pincode
            state.state=action.payload.state
            state.email=action.payload.email
        },
        update:(state,action)=>{
            state.age=action.payload.age
            state.mobile=action.payload.mobile
            state.email=action.payload.email
            state.blood_group=action.payload.blood_group

        }
    }
})

export const detailsActions=detailsSlice.actions
export default detailsSlice