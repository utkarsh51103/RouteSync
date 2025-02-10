import { configureStore } from '@reduxjs/toolkit';
import {toLocationReducer , fromLocationReducer, viewTypeReducer, ToaddressReducer, FromaddressReducer, routenumberreducer} from './slice/locationSlice';

const store = configureStore({
    reducer: {
        ToLocation:toLocationReducer,
        fromLocation:fromLocationReducer,
        viewType:viewTypeReducer,
        Toaddress:ToaddressReducer,
        Fromaddress:FromaddressReducer,
        routenumber:routenumberreducer
    },
})

export default store;
