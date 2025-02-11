import { useState } from "react";
import Search from "./components/search";
import { Tooltip } from "react-tooltip";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineHotel } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Hotel from './components/Hotels'
import Restaurant from './components/Restaurants'

function index() {

  const [searchdialog,setsearchdialog] = useState(true);
  const [hoteldialog,sethoteldialog] = useState(false);
  const [fooddialog,setfooddialog] = useState(false);

  const FoodDialog = () =>{
       if(searchdialog == true || hoteldialog == true){
        setsearchdialog(false);
        sethoteldialog(false)
       }
       setfooddialog(true)
  }

  const HotelDialog = () =>{
    if(searchdialog == true || fooddialog == true){
     setsearchdialog(false);
     setfooddialog(false)
    }
    sethoteldialog(true)
}

const closedialog = () =>{
    setsearchdialog(false);
    setfooddialog(false);
    sethoteldialog(false);
}


const LocationDialog = () =>{
  if(fooddialog == true || hoteldialog == true){
   setfooddialog(false);
   sethoteldialog(false)
  }
  setsearchdialog(true)
}

  return (
    <div>
    
    {
      searchdialog && <div className="absolute h-[500px] md:h-[630px] w-[500px] top-10 sm:left-2 md:left-36 flex justify-center z-20 bg-black/90 rounded-2xl transition-all duration-300">
      <Search/>
      <IoMdClose className="absolute text-white top-3 right-3 text-3xl cursor-pointer" onClick={()=>closedialog()}/>
      </div>
    }
    {
      hoteldialog && <div className="absolute h-[500px] md:h-[630px] w-[500px] top-10 sm:left-2 md:left-36 flex justify-center z-20 bg-black/90 rounded-2xl transition-all duration-300">
      <Hotel/>
      <IoMdClose className="absolute text-white top-3 right-3 text-3xl cursor-pointer" onClick={()=>closedialog()}/>
      </div>
    }

    {
      fooddialog && <div className="absolute h-[500px] md:h-[630px] w-[500px] top-10 sm:left-2 md:left-36 flex justify-center z-20 bg-black/90 rounded-2xl transition-all duration-300">
      <Restaurant/>
      <IoMdClose className="absolute text-white top-3 right-3 text-3xl cursor-pointer" onClick={()=>closedialog()}/>
      </div>
    }
    
      <div className="absolute flex sm:flex-row items-center justify-center sm:bottom-0 md:top-0 md:left-0 md:h-[50vh] md:w-[10vw] lg:w-[8vw] xl:w-[6vw] sm:w-[100vw] sm:h-[15vh] md:mt-36 bg-black/60 backdrop-blur-sm z-20 rounded-lg">
        <div className="flex md:flex-col sm:flex-row items-center justify-around md:gap-10 sm:gap-20 sm:ml-10 md:ml-0 text-white">
          <div className="text-md font-bold flex items-center flex-col text-orange-500 cursor-pointer"
          onClick={() => LocationDialog()}
          >
            <FaLocationDot className="text-3xl" data-tooltip-id='location-id' />
            <Tooltip id="location-id" content="Search Route"/>
            <span className="md:hidden">Search Route</span>
          </div>
          <div className="text-md font-bold flex items-center flex-col text-red-400 cursor-pointer"
          onClick={()=>HotelDialog()}
          >
            <MdOutlineHotel className="text-3xl" data-tooltip-id='hotel-id' />
            <Tooltip id="hotel-id" content="Search Hotels"/>
            <span className="md:hidden">Find Hotel</span>
          </div>
          <div className="text-md font-bold flex items-center flex-col text-green-400 cursor-pointer"
           onClick={() => FoodDialog()}
          >
            <IoFastFood className="text-3xl" data-tooltip-id='food-id' />
            <Tooltip id="food-id" content="Find Food"/>
            <span className="md:hidden">Food</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
