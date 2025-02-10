import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine"
import { useSelector } from "react-redux";

import axios from "axios"

function MapArea() {
  const mapRef = useRef(null);
  const tileRef = useRef(null);
  const mapInstance = useRef(null);
  const routingRef = useRef(null);
  const [zoom,setzoom] = useState(3);
  const [dangerousplaces,setdangerousplaces] = useState([])
  
  const viewtype = useSelector((state) => state.viewType.view);
  const tolongitude = useSelector((state) => state.ToLocation.longitude);
  const tolatitude = useSelector((state) => state.ToLocation.latitude);
  const fromLongitude = useSelector((state) => state.fromLocation.longitude);
  const fromLatitude = useSelector((state) => state.fromLocation.latitude);
  const routenumber = useSelector((state)=>state.routenumber.number);

  useEffect(() => {
    const map = L.map(mapRef.current).setView(
      [fromLatitude, fromLongitude],
      zoom
    );
    mapInstance.current = map;

    const addtileLayer = () => {
      let tile = "";
      switch (viewtype) {
        case "street":
          tile =
            "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXRrYXJzaDUxMSIsImEiOiJjbTYyM3d2b2gwcDhlMmtzZncwbjlsMHkwIn0.rf0wivdr5CRxcnrSpPmN6w";
          break;
        case "satellite":
          tile =
            "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXRrYXJzaDUxMSIsImEiOiJjbTYyM3d2b2gwcDhlMmtzZncwbjlsMHkwIn0.rf0wivdr5CRxcnrSpPmN6w";
          break;
        case "light":
          tile =
            "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXRrYXJzaDUxMSIsImEiOiJjbTYyM3d2b2gwcDhlMmtzZncwbjlsMHkwIn0.rf0wivdr5CRxcnrSpPmN6w";
          break;
        case "dark":
          tile =
            "https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXRrYXJzaDUxMSIsImEiOiJjbTYyM3d2b2gwcDhlMmtzZncwbjlsMHkwIn0.rf0wivdr5CRxcnrSpPmN6w";
          break;
        default:
          tile =
            "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXRrYXJzaDUxMSIsImEiOiJjbTYyM3d2b2gwcDhlMmtzZncwbjlsMHkwIn0.rf0wivdr5CRxcnrSpPmN6w";
      }
      if (tileRef.current) {
        map.removeLayer(tileRef.current);
      }
      tileRef.current = L.tileLayer(tile, {
        attribution: "&copy; Mapbox &copy; OpenStreetMap",
      }).addTo(map);
    };

    addtileLayer();

    if(fromLatitude != 0 || fromLongitude != 0){
    L.marker([fromLatitude, fromLongitude]).addTo(map).bindPopup(`<h6>From</h6>`);
    map.setView([fromLatitude, fromLongitude], 13);
    }
    if(tolatitude != 0 || tolongitude != 0){
         L.marker([tolatitude, tolongitude]).addTo(mapInstance.current).bindPopup(`<h6>To</h6>`);;
         mapInstance.current.setView([tolatitude, tolongitude], 14)
    }

    if(routingRef.current){
        map.removeControl(routingRef.current);
    }

    if((fromLatitude != 0 || fromLongitude != 0) && (tolatitude != 0 || tolongitude != 0)){
    routingRef.current = L.Routing.control({
        waypoints:[
            L.latLng(fromLatitude,fromLongitude),
                L.latLng(tolatitude,tolongitude),
        ],
        routeWhileDragging:true,
        show:false
    })
    .on('routesfound',async(e)=>{
        const routes = e.routes;
        if(routes.length>0){
            const bounds = L.latLngBounds();
            const routeCoordinates = routes[routenumber].coordinates.map((coord) => ({
                lat: coord.lat,
                lng: coord.lng,
              }));
              routeCoordinates.forEach((coord) => bounds.extend(coord));
              map.fitBounds(bounds, { padding: [50, 50] });
        map.fitBounds(bounds,{padding:[50,50]});
        try {
            const res = await axios.post(`http://localhost:5004/route/get-danger`,{routeCords:routeCoordinates})
            
           setdangerousplaces(res.data.data);
      } catch (error) {
          console.log(error.message)
      }
        }
    })
    .addTo(map);
}else{
    setzoom(2);
}

    const directionsContainer = document.querySelector(
        ".leaflet-routing-container"
      );
      if (directionsContainer) {
        directionsContainer.style.display = "none";
      }
       

    return () => {
      map.remove();
    };
  }, [viewtype, fromLatitude, fromLatitude, tolatitude, tolongitude, routenumber]);
   useEffect(()=>{
  if(dangerousplaces.length > 0 &&  mapInstance.current){
 dangerousplaces.forEach((danger,index) => {
   L.marker([danger.Latitude, danger.Longitude], { icon: L.icon({ iconUrl: "https://maps.google.com/mapfiles/kml/shapes/caution.png", iconSize: [15,15], iconAnchor: [12, 30] }) })
     .addTo(mapInstance.current)
     .bindPopup(`<b>Crime:</b> ${danger.FrequentCrime} <br/><b>Location:</b> ${danger.LocationName}`);
 });
   }
},[dangerousplaces])
  

  return <div className="h-[100vh] w-[100vw] z-10" ref={mapRef}></div>;
}

export default MapArea;
