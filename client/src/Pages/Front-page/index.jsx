import image from "./Images/map.jpg";
import { FaLocationArrow } from "react-icons/fa6";
import { FaMapLocation } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {setFromLocation ,setToLocation} from "../../Store/slice/locationSlice";
import toast from "react-hot-toast";


function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tolongitude = useSelector((state) => state.ToLocation.longitude);
  const fromlatitude = useSelector((state) => state.fromLocation.latitude);
  const fromlongitude = useSelector((state) => state.fromLocation.longitude);
  const tolatitude = useSelector((state) => state.ToLocation.latitude);
  const [tosuggestions, settosuggestions] = useState([]);
  const [fromsuggestions, setfromsuggestions] = useState([]);
  const [toterm, settoterm] = useState("");
  const [fromterm, setfromterm] = useState("");

  const getTosuggestions = async (Toterm) => {
    if (Toterm.length < 3) {
      return;
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      Toterm
    )}.json?access_token=pk.eyJ1IjoidXRrYXJzaDUxMSIsImEiOiJjbTYyM3d2b2gwcDhlMmtzZncwbjlsMHkwIn0.rf0wivdr5CRxcnrSpPmN6w`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const suggestion = data.features;
      settosuggestions(suggestion);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getFromsuggestions = async (Toterm) => {
    if (Toterm.length < 3) {
      return;
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      Toterm
    )}.json?access_token=pk.eyJ1IjoidXRrYXJzaDUxMSIsImEiOiJjbTYyM3d2b2gwcDhlMmtzZncwbjlsMHkwIn0.rf0wivdr5CRxcnrSpPmN6w`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const suggestion = data.features;
      setfromsuggestions(suggestion);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(()=>{

    if(toterm.length<3){
      settosuggestions([]);
    }
    if(fromterm.length<3){
      setfromsuggestions([]);
    }

  },[toterm,fromterm])

  useEffect(()=>{
    if(tosuggestions.length>0){
      if(fromsuggestions.length>0){
     setfromsuggestions([]);
     setfromterm("");
    }
    }
  },[tosuggestions])

  useEffect(()=>{
    if(fromsuggestions.length>0){
      if(tosuggestions.length>0){
     settosuggestions([]);
     settoterm("");
      }
    }
  },[fromsuggestions])

  const selectfromlocation = (location) => {
       setfromterm(location.place_name);
       dispatch(setFromLocation({latitude:location.center[1],longitude:location.center[0]}));
       setfromsuggestions([]);
  }

  const selecttolocation = (location) => {
       settoterm(location.place_name);
       dispatch(setToLocation({latitude:location.center[1],longitude:location.center[0]}));
       settosuggestions([]);
  }

  const Search = () =>{
     if((tolatitude!==0 && tolongitude!==0) && (fromlatitude!==0 && fromlongitude!==0)){
      navigate("/map");
     }else{
        toast.error("Please select both locations");
     }
  }

  const getAddress = async (lat, longi) => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longi},${lat}.json?access_token=pk.eyJ1IjoidXRrYXJzaDUxMSIsImEiOiJjbTYyM3d2b2gwcDhlMmtzZncwbjlsMHkwIn0.rf0wivdr5CRxcnrSpPmN6w`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setfromterm(data.features[0].place_name);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    const getcurrentLocation = () => {
      const geo = navigator.geolocation;
      const userCordinates = (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        const lati = position.coords.latitude;
        const longi = position.coords.longitude;
        dispatch(setFromLocation({ latitude: lati, longitude: longi }));
        getAddress(lati, longi);
      };
      geo.getCurrentPosition(userCordinates);
    };

  return (
    <>
      <div
        className="w-[100vw] h-[100vh] flex items-center justify-between overflow-hidden"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
       <div className="h-full absolute xl:flex xl:flex-col top-[40%] ml-24 text-orange-600 hidden font-bold">
          <div>
            <span className="text-[70px]">Route</span>
            <span className="text-[70px] text-white">Sync</span>
          </div>
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-[20px]"
          >
            Explore the Safest Routes
          </motion.div>
        </div>
        <div className="absolute top-[5%] md:right-[20%] lg:right-[30%] xl:right-[20%] sm:right-[10%] flex flex-col justify-center sm:justify-center h-[600px] w-[400px] bg-black/65 rounded-xl">
          { (tosuggestions.length == 0 && fromsuggestions == 0) && <div className="text-gray-500 xl:hidden absolute top-0 bottom-0 ml-4">
            <span className="text-[60px] font-semibold text-orange-500">R</span>
            <span className="text-[60px] font-semibold">oute</span>
            <span className="text-[60px] font-semibold text-orange-500">
              Sync
            </span>
            <motion.p
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="font-semibold text-gray-200"
            >
              Explore the Safest Routes
            </motion.p>
          </div>}
          <div className="flex items-center justify-center text-orange-500 text-[30px] font-bold mb-5 ml-3">
            Set Your Journey
          </div>
          <div className="flex flex-col items-center justify-center  md:flex-col overflow-y-scroll z-10">
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center justify-center">
                <FaLocationArrow className="text-white text-xl" />
                <input
                  className="mt-2 mx-2 p-3 bg-gray-500 rounded-xl text-white w-60 xl:w-72 outline-none"
                  type="text"
                  placeholder="From"
                  value={fromterm}
                  onChange={(e) => {
                    setfromterm(e.target.value);
                    getFromsuggestions(e.target.value);
                  }}
                />
              </div>
              <div className="flex text-orange-400 items-center justify-center ml-7 mt-1">
                <CiLocationOn className="text-sm" />
                <button className=" text-xs font-light"
                onClick={() => getcurrentLocation()}
                >
                  Set current location
                </button>
              </div>
            </div>
            {fromsuggestions.length > 0 && (
              <div className="mx-8 flex gap-2 flex-col  rounded shadow-md mt-2">
                {fromsuggestions.map((suggested, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-700 bg-gray-600 rounded-lg text-white transition-all duration-200 cursor-pointer"
                  onClick={()=>selectfromlocation(suggested)} >
                    {suggested.place_name}
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-center mt-3">
              <FaMapLocation className="text-white text-xl" />
              <input
                className="mt-2 mx-2 p-3 bg-gray-500 rounded-xl text-white w-60 xl:w-72 outline-none"
                type="text"
                placeholder="To"
                value={toterm}
                onChange={(e)=>{
                  settoterm(e.target.value)
                  getTosuggestions(e.target.value)
                }}
              />
            </div>
            {tosuggestions.length > 0 && (
              <div className="mx-8 flex gap-2 flex-col  rounded shadow-md mt-2">
                {tosuggestions.map((suggested, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-700 bg-gray-600 rounded-lg text-white transition-all duration-200 cursor-pointer"
                  onClick={()=>selecttolocation(suggested)} >
                    {suggested.place_name}
                  </div>
                ))}
              </div>
            )}

            <button className="mt-5 py-2 px-4 w-40 md:w-40 lg:w-60 xl:w-60 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-all duration-300 " onClick={()=>Search()}>
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
