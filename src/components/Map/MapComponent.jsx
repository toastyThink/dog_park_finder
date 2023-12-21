

import { useState, useEffect } from "react";
import { 
    AdvancedMarker,
    // Marker,
    APIProvider,
    // InfoWindow,
    Map,
    // useAdvancedMarkerRef,
    // Pin
  } from '@vis.gl/react-google-maps';

import './MapComponent.css'

import config from "../../config/config";
const key = config.API_KEY;
const geoKey = config.GEO_KEY;
// const mylibraries = ["places"]
const mapContainerStyle = {
    width: "100%",
    height: "100vh"
}

const zoom = 14.5;

const center = {
    lat: 40.730610,
    lng: -73.935242
}



export default function MapComponent(){
    const [dogParks, setDogParks] = useState([]);
    const [place, setPlace] = useState({
        lat: "",
        long: ""
    });

    async function handleData(){
        const url = `https://api.geoapify.com/v2/places?categories=pet.dog_park&filter=circle:-73.99854101503041,40.702963943946884,5000&bias=proximity:-73.99854101503041,40.702963943946884&limit=20&apiKey=${geoKey}`
    try{
    const response = await fetch(url, {method: "GET"});
    const data = await response.json();
    console.log(data)
    setDogParks(data.features)
    }catch(err){
    console.log(err)
    }
}
    useEffect(() => {
        handleData()
    }, []);
    
    console.log(dogParks);

    async function handleSubmit(e){
        e.preventDefault()                      //location is the string associated with name in the input field
        const latValue = e.currentTarget.latitude.value;
        const longValue = e.currentTarget.longitude.value;
        setPlace({...place.lat = latValue});
        setPlace({...place.long = longValue});
    }

    useEffect(() => {
        handleSubmit
    },[])

    return(
        <APIProvider apiKey={key} libraries={['places']}>
            <Map className="map" mapId={'c23b025437a4833d'} zoom={zoom} center={center} mapContainerStyle={mapContainerStyle}>
           
               <search className="searchForm" >
                    <form onSubmit={ (e) => {handleSubmit(e)}} >
                        <input type="text" name="latitude" id="search1" placeholder="Type a Latitude here" />
                        <input type="text" name="longitude" id="search2" placeholder="Type a Longitude here" />
                        <button type="submit">Search</button>
                    </form>
                </search>
               { dogParks?.map( (d) => (
     
                 <>
                    <AdvancedMarker
                    className="nameTag"
                    title={"Name: " + d.properties.address_line1} 
                    key={d.properties.place_id} 
                    position={{lat: d.properties.lat, lng: d.properties.lon}}
                    >
                    <h2>{d.properties.address_line1}</h2>
                   </AdvancedMarker>
                </>
                ))}
           </Map>
       </APIProvider>
    )
}





