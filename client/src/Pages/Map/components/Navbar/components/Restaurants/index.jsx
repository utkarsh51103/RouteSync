import React from "react";
import { useState, useEffect } from "react";
import {
  setToLocation,
  setFromLocation,
} from "../../../../../../Store/slice/locationSlice";
import { useDispatch } from "react-redux";
import { MdDirectionsRun } from "react-icons/md";
import { motion } from "framer-motion";
import { IoFastFood } from "react-icons/io5";


function index() {
  const [restaurantSearch, setRestaurantSearch] = useState("");
  const [places, setplaces] = useState([]);
  const dispatch = useDispatch();
  const [restaurants, setrestaurants] = useState([]);
  const [selectedRestaurants, setselectedRestaurants] = useState({});
  const [imageurl, setimageurl] = useState("");

  const placesSuggestions = async () => {
    try {
      if (restaurantSearch.length > 3) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          restaurantSearch
        )}.json?access_token=pk.eyJ1IjoidXRrYXJzaDUxMSIsImEiOiJjbTYyM3d2b2gwcDhlMmtzZncwbjlsMHkwIn0.rf0wivdr5CRxcnrSpPmN6w`;
        const response = await fetch(url);
        const data = await response.json();
        setplaces(data.features);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const setRestaurantSearchLocation = async (place) => {
    setplaces([]);
    const longitude = place.center[0];
    const latitude = place.center[1];

    try {
      const url4 = `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&query=restaurant&limit=10`;

      const response = await fetch(url4, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "fsq3sZVAgQrTKyRNsG3/BI4fVByOrbF1eWdmmv6fEijCjH4=",
        },
      });
      const data = await response.json();
      setrestaurants(data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  const searchRestaurant = (r) => {
    dispatch(
      setToLocation({
        latitude: r.geocodes.main.latitude,
        longitude: r.geocodes.main.longitude,
      })
    );
    dispatch(setFromLocation({ latitude: 0, longitude: 0 }));
    setrestaurants([]);
    setselectedRestaurants(r);
    getImages(r.fsq_id);
  };

  const getImages = async (fsq_id) => {
    const url = `https://api.foursquare.com/v3/places/${fsq_id}/photos`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "fsq3sZVAgQrTKyRNsG3/BI4fVByOrbF1eWdmmv6fEijCjH4="
        }
    });

    const data = await response.json();
    if (data.length > 0) {
        const imageUrl = data[0].prefix + "original" + data[0].suffix;
        setimageurl(imageUrl);
    } else {
        console.log("No images found for this hotel.");
    }
};

const ReachThere = () => {
    const geo = navigator.geolocation;
    const userCordinates = (position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      const lati = position.coords.latitude;
      const longi = position.coords.longitude;
      dispatch(setFromLocation({ latitude: lati, longitude: longi }));
    };
    geo.getCurrentPosition(userCordinates);
  };

  useEffect(()=>{
     if(restaurantSearch.length<3){
       setrestaurants([])
       setplaces([])
     }
     setselectedRestaurants({})
  },[restaurantSearch])

  return (
    <div className="flex flex-col gap-5 w-full items-center justify-start">
      <div className="text-3xl mt-5 font-thin text-white">
        Find <span className="text-green-400">Restaurants</span>
      </div>
      <div className="flex gap-5 items-center justify-center">
        <IoFastFood className="text-white text-2xl" />
        <input
          type="text"
          placeholder="Search Here..."
          className="p-2 px-4 bg-green-400 rounded-lg placeholder:text-white font-light"
          value={restaurantSearch}
          onChange={(e) => {
            setRestaurantSearch(e.target.value);
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
              onClick={() => setRestaurantSearchLocation(place)}
            >
              {index + 1}
              {". "}
              {place.place_name}
            </motion.div>
          ))}
        </div>
      )}
      {restaurants.length > 0 && (
        <div className="w-full overflow-y-scroll flex flex-col items-center gap-5 pt-5">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: "linear" }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-2 w-[90%] cursor-pointer bg-white rounded-md text-black font-thin"
              onClick={() => searchRestaurant(restaurant)}
            >
              <div className="font-semibold">
                {index + 1}
                {". "}
                {restaurant.name}
              </div>
              <div className="flex gap-1 items-center">
                <div className="font-medium">Address </div>
                <div className="text-sm border-l-[1px] border-black ml-3 pl-3">
                  <div>{restaurant.location.address}</div>
                  <div>{restaurant.location.locality}{" "}{restaurant.location.region}</div>
                  <div>{restaurant.location.postalcode}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {Object.keys(selectedRestaurants).length > 0 && (
        <div className="flex rounded-lg w-full flex-col gap-5 items-center justify-center">
          <div className="flex flex-col gap-5 items-center justify-center w-[90%] bg-white rounded-lg p-3">
            <div className="flex w-full gap-5 items-center font-semibold text-green-400 justify-center">
            <div className="flex-1"><img src={imageurl.length>0 ? imageurl : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreedesignfile.com%2F613263-hotel-cartoon-vector%2F&psig=AOvVaw3Hot55G1UWnEvGhqt4P-uC&ust=1739247681048000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNC5wNSguIsDFQAAAAAdAAAAABAE"} className="h-[100px] w-[150px]"/></div>
            <div className="flex flex-1 items-center text-2xl justify-center">{selectedRestaurants.name}</div>  
            </div>
            <div className="flex items-center gap-3 text-black justify-start">
              <span className="font-bold">
                Address{" "}
              </span>
              <div className="text-sm border-l-[1px] border-black ml-3 pl-3">
                  <div>{selectedRestaurants.location.address}</div>
                  <div>{selectedRestaurants.location.locality}{" "}{selectedRestaurants.location.region}</div>
                  <div>{selectedRestaurants.location.postalcode}</div>
                </div> 
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MdDirectionsRun className="text-red-400 text-xl" />
            <motion.button
              className=" text-red-500 text-sm bg-white hover:bg-gray-200 transition-all duration-300 py-2 px-3 rounded-lg"
              whileHover={{ scale: 1.1 }}
              onClick={()=>ReachThere()}
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
