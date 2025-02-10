import React from "react";
import { FaHotel } from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  setToLocation,
  setFromLocation,
} from "../../../../../../Store/slice/locationSlice";
import { useDispatch } from "react-redux";
import { MdDirectionsRun } from "react-icons/md";
import { motion } from "framer-motion";

function index() {
  const [hotelSearch, setHotelSearch] = useState("");
  const [places, setplaces] = useState([]);
  const dispatch = useDispatch();
  const [hotels, sethotels] = useState([]);
  const [selectedhotel, setselectedhotel] = useState({});

  const placesSuggestions = async () => {
    try {
      if (hotelSearch.length > 3) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          hotelSearch
        )}.json?access_token=pk.eyJ1IjoidXRrYXJzaDUxMSIsImEiOiJjbTYyM3d2b2gwcDhlMmtzZncwbjlsMHkwIn0.rf0wivdr5CRxcnrSpPmN6w`;
        const response = await fetch(url);
        const data = await response.json();
        setplaces(data.features);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const setHotelsearchLocation = async (place) => {
    setplaces([]);
    const longitude = place.center[0];
    const latitude = place.center[1];

    try {
      const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/hotel.json?proximity=${longitude},${latitude}&access_token=pk.eyJ1IjoidXRrYXJzaDUxMSIsImEiOiJjbTYyM3d2b2gwcDhlMmtzZncwbjlsMHkwIn0.rf0wivdr5CRxcnrSpPmN6w`;

      const url1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/hotel.json?types=poi&proximity=${longitude},${latitude}&access_token=pk.eyJ1IjoidXRrYXJzaDUxMSIsImEiOiJjbTYyM3d2b2gwcDhlMmtzZncwbjlsMHkwIn0.rf0wivdr5CRxcnrSpPmN6w`;

      const response = await fetch(url2);
      const data = await response.json();
      sethotels(data.features);
      console.log(data.features);
    } catch (error) {
      console.log(error.message);
    }
  };

  const searchHotel = (hotel) => {
    dispatch(
      setToLocation({
        latitude: hotel.center[1],
        longitude: hotel.center[0],
      })
    );
    dispatch(setFromLocation({ latitude: 0, longitude: 0 }));
    sethotels([]);
    setselectedhotel(hotel);
    console.log(hotel);
  };

  useEffect(() => {
    console.log("Updated selected hotel:", selectedhotel);
  }, [selectedhotel]);

  return (
    <div className="flex flex-col gap-5 items-center justify-start">
      <div className="text-3xl mt-5 font-thin text-white">
        Find <span className="text-red-400">Hotels</span>
      </div>
      <div className="flex gap-5 items-center justify-center">
        <FaHotel className="text-white text-2xl" />
        <input
          type="text"
          placeholder="Search Here..."
          className="p-2 px-4 bg-red-400 rounded-lg placeholder:text-white font-light"
          value={hotelSearch}
          onChange={(e) => {
            setHotelSearch(e.target.value);
            placesSuggestions();
          }}
        />
      </div>
      {places.length > 0 && (
        <div className="flex overflow-y-scroll flex-col gap-2 items-center justify-center w-full">
          {places.map((place, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="text-black w-[90%] px-2 py-3 cursor-pointer rounded-md bg-white"
              key={index}
              onClick={() => setHotelsearchLocation(place)}
            >
              {index + 1}
              {". "}
              {place.place_name}
            </motion.div>
          ))}
        </div>
      )}
      {hotels.length > 0 && (
        <div className="w-full overflow-y-scroll flex flex-col items-center gap-5 pt-5">
          {hotels.map((hotel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: 'linear'}}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-2 w-[90%] cursor-pointer bg-white rounded-md text-black font-thin"
              onClick={() => searchHotel(hotel)}
            >
              <div className="font-semibold">
                {index + 1}
                {". "}
                {hotel.text}
              </div>
              <div className="flex gap-1 items-center">
                <div className="font-medium">Address </div>
                <div className="text-sm border-l-[1px] border-black ml-3 pl-3">
                  {hotel.place_name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {Object.keys(selectedhotel).length > 0 && (
        <div className="flex rounded-lg flex-col gap-5 items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-center w-[90%] bg-white rounded-lg p-3">
            <div className="flex items-center font-semibold text-red-400 justify-center">
              {selectedhotel.text}
            </div>
            <div className="flex items-center gap-3 text-black justify-start">
              <span className="font-bold border-r-[1px] border-black pr-3">
                Address{" "}
              </span>
              {selectedhotel.place_name}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MdDirectionsRun className="text-red-400 text-xl" />
            <motion.button className="text-lg text-red-400 bg-white hover:bg-gray-200 transition-all duration-300 py-2 px-3 rounded-lg"
            whileHover={{ scale: 1.1 }}
            >
              Reach There
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

export default index;
