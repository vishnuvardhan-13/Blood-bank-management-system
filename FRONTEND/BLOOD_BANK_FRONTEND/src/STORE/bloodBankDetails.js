import { createSlice } from "@reduxjs/toolkit"
const bloodBankDetailsSlice=createSlice({
    name:"blood_bank_details",
    initialState:{bbid:"",state:"",district:"",city:"",bbb_name:"",parent_hs_name:"",category:"",bb_email:"",bb_number:"",address1:"",address2:"",pincode:0,emp_id:""},
    reducers:{
        values:(state,action)=>{
            console.log("Redux")
            state.bbid=action.payload.bbid
            state.state=action.payload.state
            state.district=action.payload.district
            state.city=action.payload.city
            state.bbb_name=action.payload.bbb_name
            state.parent_hs_name=action.payload.parent_hs_name
            state.category=action.payload.category
            state.bb_email=action.payload.bb_email
            state.bb_number=action.payload.bb_number
            state.address1=action.payload.address1
            state.address2=action.payload.address2
            state.pincode=action.payload.pincode
            state.emp_id=action.payload.emp_id

        },
        update:(state,action)=>{
            state.bb_number=action.payload.bb_number
            state.bb_email=action.payload.bb_email
        }
    }
})

export const bloodBankDetailsActions=bloodBankDetailsSlice.actions
export default bloodBankDetailsSlice