import React from 'react';
import MapArea from './components/MapArea/index.jsx';
import Navbar from './components/Navbar/index.jsx';
import ViewType from './components/viewType/index.jsx';
import { useDispatch } from 'react-redux';

function Index() {

    return (
        <div className='h-[100vh] w-[100vw] flex md:flex-row sm:flex-col'>
            <ViewType/> 
            <Navbar/>
            <MapArea />
        </div>
    );
}

export default Index;
