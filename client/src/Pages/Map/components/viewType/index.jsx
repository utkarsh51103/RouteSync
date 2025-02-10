import React from 'react';
import { useDispatch } from 'react-redux';
import { setViewType } from '../../../../Store/slice/locationSlice';

function index() {

    const dispatch = useDispatch();

    return (
        <span className='absolute z-20 ml-16 mt-2 p-2 bg-white rounded-lg '>
        <select className='font-light border-none' name='Street' onChange={(e=>dispatch(setViewType(e.target.value)))}>
        <option value="street">Street</option>
        <option value="satellite">Sattelite</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        </select>
        </span>
    );
}

export default index;