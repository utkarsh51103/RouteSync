import React, { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { FaMapLocation } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { MdClear } from "react-icons/md";

import {
  setToLocation,
  setFromLocation,
  setRoutenumber,
} from "../../../../../../Store/slice/locationSlice.js";

function index() {
  const Toaddress = useSelector((state) => state.Toaddress.Toaddress);
  const Fromaddress = useSelector((state) => state.Fromaddress.Fromaddress);
  const dispatch = useDispatch();
  const [dialogopen, setdialogopen] = useState(false);
  const [dialogterm, setdialogterm] = useState("");
  const [fromterm, setfromterm] = useState("");
  const [Toterm, setToterm] = useState("");
  const [Tosuggestions, setTosuggestions] = useState([]);
  const [Fromsuggestions, setFromsuggestions] = useState([]);

  const selectedAdress = (address) => {
    if (dialogterm === "From") {
      setfromterm(address.place_name);
      dispatch(
        setFromLocation({
          latitude: address.center[1],
          longitude: address.center[0],
        })
      );
    } else if (dialogterm === "To") {
      setToterm(address.place_name);
      dispatch(
        setToLocation({
          latitude: address.center[1],
          longitude: address.center[0],
        })
      );
    }
    setdialogopen(false);
    setTosuggestions([]);
  };

  const getsuggestions = async (Toterm, e) => {
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
      console.log(suggestion);
      if (e == "to") {
        setTosuggestions(suggestion);
      } else if (e == "from") {
        setFromsuggestions(suggestion);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (Toterm < 3) {
      setTosuggestions([]);
    }
    if (fromterm < 3) {
      setFromsuggestions([]);
    }
  }, [Toterm, setTosuggestions, fromterm, setFromsuggestions]);

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
    <div className="flex flex-col items-center  gap-5 sm:ml-0 md:ml-0 mt-5">
      <div>
        <span className="text-3xl font-bold text-orange-500">Search</span>
        <span className="text-3xl font-bold text-white ml-2">your way</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        {Tosuggestions.length === 0 ? (
          <div className="flex flex-col items-start justify-center">
            <div className="flex items-center justify-center gap-2 text-white">
              <FaLocationArrow className="text-white text-xl" />
              <input
                className="p-2 px-4 rounded-md bg-gray-500 xl:w-64 text-white font-medium placeholder-white"
                placeholder="From"
                value={fromterm}
                onChange={(e) => {
                  setfromterm(e.target.value);
                  getsuggestions(e.target.value, "from");
                }}
              />
              <span
                className="cursor-pointer"
                onClick={() => {
                  setfromterm("");
                }}
              >
                X
              </span>
            </div>
            <div className="flex text-orange-400 items-center justify-center ml-7 mt-1">
              <CiLocationOn className="text-sm" />
              <button
                className=" text-xs font-light"
                onClick={() => getcurrentLocation()}
              >
                Set current location
              </button>
            </div>
          </div>
        ) : null}
        <div className="flex flex-col gap-5 overflow-y-scroll max-h-[250px]">
          {Fromsuggestions &&
            Fromsuggestions.map((suggested, index) => (
              <div
                className="mx-5 w-[350px] bg-gray-500 rounded-md p-2 text-white cursor-pointer"
                onClick={() => {
                  dispatch(
                    setFromLocation({
                      latitude: suggested.center[1],
                      longitude: suggested.center[0],
                    })
                  );
                  setfromterm(suggested.place_name);
                  setFromsuggestions([]);
                }}
              >
                <span className="mr-2 p-1 px-2 bg-gray-600 rounded-full">
                  {index + 1}
                </span>
                {suggested.place_name}
              </div>
            ))}
        </div>
        {Fromsuggestions.length === 0 ? (
          <div className="flex items-center justify-center gap-2">
            <FaMapLocation className="text-white text-xl" />
            <input
              className="p-2 px-4 rounded-md xl:w-64  bg-gray-500 text-white font-medium placeholder-white"
              placeholder="To"
              value={Toterm}
              onChange={(e) => {
                setToterm(e.target.value);
                getsuggestions(e.target.value, "to");
              }}
            />
          </div>
        ) : null}
        <div className="flex flex-col gap-5 overflow-y-scroll max-h-[250px]">
          {Tosuggestions &&
            Tosuggestions.map((suggested, index) => (
              <div
                className="mx-5 w-[350px] bg-gray-500 rounded-md p-2 text-white cursor-pointer"
                onClick={() => {
                  dispatch(
                    setToLocation({
                      latitude: suggested.center[1],
                      longitude: suggested.center[0],
                    })
                  );
                  setToterm(suggested.place_name);
                  setTosuggestions([]);
                }}
              >
                <span className="mr-2 p-1 px-2 bg-gray-600 rounded-full">
                  {index + 1}
                </span>
                {suggested.place_name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default index;
