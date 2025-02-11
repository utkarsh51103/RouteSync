import Empty from "./Pages/Front-page";
import MapPage from "./Pages/Map/index.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Toaster } from "react-hot-toast"
import axios from "axios";
function App() {

  const HOST = import.meta.env.VITE_SERVER_URL;

   const servercheck = async () =>{
    try {
      const res = await axios.get(`${HOST}/`);
      console.log(res.data)
    } catch (error) {
      console.log(error.message)
    }
   }

   servercheck();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Empty/>} />
        <Route path="/map" element={<MapPage/>}/>
        <Route path="*" element={<Empty/>}/>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
