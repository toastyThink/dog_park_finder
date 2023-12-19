
import {
    GoogleMap,
    useLoadScript,
    // Marker,
    // InfoWindow
} from "@react-google-maps/api"

import './MapComponent.css'

import config from "../../config/config";
const key = config.API_KEY
const mylibraries = ["places"]
const mapContainerStyle = {
    width: "100%",
    height: "100vh"
}

const zoom = 14.5;

const center = {
    lat: 40.730610,
    lng: -73.935242
}

///////Fetch Dog Parks API////////////////////////////////////////////////////
import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://pipican-dog-park-and-dog-beach-locator-api.p.rapidapi.com/nearby-basic',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'f154102b88mshd921a87113282dap1097e9jsn89d5230e6eee',
    'X-RapidAPI-Host': 'pipican-dog-park-and-dog-beach-locator-api.p.rapidapi.com'
  },
  data: {
    coords: {
      lat: 42.361145,
      lng: -71.057083
    },
    radius: 1,
    leisure: 'dog_park'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
//////////////////////////////////////////////////////////////////////////////

export default function MapComponent(){
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: key,
        libraries: mylibraries
    })

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps"; 

    if(loadError){
        return console.log(loadError)
    }

    return(
        <div className="map">
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={center}></GoogleMap>
        </div>
    )
}













//=======================================================
// import React from "react";

// import {APIProvider, Map} from '@vis.gl/react-google-maps';
// import config from "../../config/config";
// const key = config.API_KEY

// const center = {lat: 22.54992, lng: 0}


// const App = () => {
//     <APIProvider apiKey={key}>
//       <Map
//         zoom={3}
//         center={{lat: 22.54992, lng: 0}}
//         gestureHandling={'greedy'}
//         disableDefaultUI={true}
//       ></Map>
//     </APIProvider>
// };

// async function MapComponent(){
//     return(
//         <>
//           <App />
//       </>
//     )
// }

// export default MapComponent


//============================================================================
// import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

// import './MapComponent.css' 
// import config from '../../config/config';


// export default function MapComponent(){
//     const key = config.API_KEY
//     const position = {lat: 53.54992, lng: 10.00678}

//     return (
//         <div >
//             <APIProvider apiKey="AIzaSyCvRro--4MgP4H8OGq_FiJoXp-HeN-765s">
//             <Map center={position} zoom={10}>
//                 <Marker position={position} />
//             </Map>
//             </APIProvider>
//         </div>
//     )
// }
//=====================================================================
// import { Loader } from "@googlemaps/js-api-loader";
// import config from "../../config/config";

// const key = config.API_KEY

// const loader = new Loader({
//     apiKey: key,
//     version: "weekly",
//   });
  
//   loader.load().then(async () => {
//     const { Map } = await google.maps.importLibrary("maps");
  
//    const map = new Map(document.getElementById("map"), {
//       center: { lat: -34.397, lng: 150.644 },
//       zoom: 8,
//     });
//   });

// export default function MapComponent(){

//     return(
//         <>
//         <div id="map" style={{height:'100vh', width:'100%'}}></div>
//         </>
//     )
    
// }