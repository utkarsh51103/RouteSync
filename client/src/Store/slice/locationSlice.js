import { createSlice } from "@reduxjs/toolkit";

const toLocationSlice = createSlice(
  {
    name: "ToLocation",
    initialState: {
      // latitude: 23.2599,
      // longitude: 77.4126,
      latitude: 0,
      longitude: 0,
    },
    reducers: {
      setToLocation: (state, action) => {
        state.latitude = action.payload.latitude;;
        state.longitude = action.payload.longitude;
      },
    },
  },
);

const fromLocationSlice = createSlice(
  {
    name:"fromLocation",
    initialState: {
      latitude: 0,
      longitude: 0,
    },
    reducers: {
      setFromLocation: (state, action) => {
        state.latitude = action.payload.latitude;;
        state.longitude = action.payload.longitude;
      },
    },
  }
)

const viewType = createSlice(
  {
    name:"viewType",
    initialState:{
      view: "street"
    },
    reducers:{
      setViewType: (state,action)=>{
        state.view = action.payload;
      }
    }
  }
)

const ToaddressSlice = createSlice(
  {
    name:"Toaddress",
    initialState:{
      address: ""
    },
    reducers:{
      setToAddress: (state,action)=>{
        state.address = action.payload;
      }
    }
  }
)
const FromaddressSlice = createSlice(
  {
    name:"Fromaddress",
    initialState:{
      address: ""
    },
    reducers:{
      setFromAddress: (state,action)=>{
        state.address = action.payload;
      }
    }
  }
)

const routenumber = createSlice(
  {
    name:"routenumber",
    initialState:{
      number:0
    },
    reducers:{
      setRoutenumber: (state)=>{
        state.number++;
      },
      resetRoutenumber: (state) =>{
        state.number = 0;
      }
    }
  }
)

export const {setViewType} = viewType.actions;
export const { setToLocation } = toLocationSlice.actions;
export const { setFromLocation } = fromLocationSlice.actions;
export const { setToAddress } = ToaddressSlice.actions;
export const { setFromAddress } = FromaddressSlice.actions;
export const { setRoutenumber,resetRoutenumber } = routenumber.actions

export const toLocationReducer = toLocationSlice.reducer;
export const fromLocationReducer = fromLocationSlice.reducer;
export const viewTypeReducer = viewType.reducer;
export const ToaddressReducer = ToaddressSlice.reducer;
export const FromaddressReducer = FromaddressSlice.reducer;
export const routenumberreducer = routenumber.reducer

