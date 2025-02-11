import React from "react";
import MapArea from "./components/MapArea/index.jsx";
import Navbar from "./components/Navbar/index.jsx";
import ViewType from "./components/viewType/index.jsx";
import { useDispatch } from "react-redux";
import { setFromLocation, setToLocation } from "../../Store/slice/locationSlice.js";

function Index() {

    const dispatch = useDispatch();

    const clearMap = () =>{
       dispatch(setToLocation({latitude:0,longitude:0}));
       dispatch(setFromLocation({latitude:0,longitude:0}));    
    }

  return (
    <div className="h-[100vh] w-[100vw] flex md:flex-row sm:flex-col">
      <div className="absolute top-0 right-0 z-30 h-[50px] w-[100px] flex items-center justify-center">
        <button className="text-white rounded-lg px-3 py-2 bg-black/70 hover:bg-black/90 transition-all duration-200" onClick={()=>clearMap()}>Clear Map</button>
      </div>
      <ViewType />
      <Navbar />
      <MapArea />
    </div>
  );
}

export default Index;
