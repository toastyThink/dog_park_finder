

import { useState, useEffect } from "react";
import { 
    AdvancedMarker,
    APIProvider,
    Map,
  } from '@vis.gl/react-google-maps';

import './MapComponent.css'

import config from "../../config/config";
const key = config.API_KEY;
const geoKey = config.GEO_KEY;

const mapContainerStyle = {
    width: "100%",
    height: "100vh"
}
const zoom = 14.5;

export default function MapComponent(){
    const [dogParks, setDogParks] = useState([]);

    const [place, setPlace] = useState({
        lat: 40.70296394394688,
        long: -73.99854101503041
    });

    async function handleData(e){
            e.preventDefault()

            const url = `https://api.geoapify.com/v2/places?categories=pet.dog_park&filter=circle:${place.long},${place.lat},5000&bias=proximity:${place.long},${place.lat}&limit=20&apiKey=${geoKey}`
        try{
            const response = await fetch(url, {method: "GET"});
            const data = await response.json();
            setDogParks(data.features)
        
        }catch(err){
        console.log(err)
        }
    }

    useEffect(() => {
        handleData()
    }, []);

    function handleChange(e){
        setPlace({...place, [e.target.name]: e.target.value});
    }
 
    if(!place.lat || !place.long){
        return (
        <>
         <h1 className="font-bold text-2xl">Loading...please enter coordinates. Omit spacing when typing</h1>
         <br/>
            <search className="searchForm" >
                <form onSubmit={ (e) => {handleData(e)}} >
                     <p className="m-4 font-bold text-2xl">Latitude:</p>  <input type="text" className="w-3/12 h-14 m-4 rounded-xl font-bold text-2xl bg-indigo-500 bg-neutral-300	text-stone-950" value={place.lat} onChange={handleChange} name="lat" id="search1" placeholder="Type a Latitude coordinate here"  required/>
                    <p className="m-4 font-bold text-2xl">Longitude:</p>  <input type="text" className="w-3/12 h-14 m-4 rounded-xl font-bold text-2xl bg-indigo-500 bg-neutral-300	text-stone-950" value={place.long} onChange={handleChange} name="long" id="search2" placeholder="Type a Longitude coordinate here" required/>
                    <button className="bg-indigo-500 m-4 rounded-xl	w-52 h-16 font-bold text-2xl" type="submit">Search</button>
                </form>
            </search>
            
           
        </>
        )
    }else if(place.lat === "-" || place.long === "-"){
        return (
            <>
             <h1 className="font-bold text-2xl">Loading...please enter coordinates. Omit spacing when typing</h1>
             <br/>
                <search className="searchForm" >
                    <form onSubmit={ (e) => {handleData(e)}} >
                         <p className="m-4 font-bold text-2xl">Latitude:</p>  <input type="text" className="w-3/12 h-14 m-4 rounded-xl font-bold text-2xl bg-indigo-500 bg-neutral-300	text-stone-950" value={place.lat} onChange={handleChange} name="lat" id="search1" placeholder="Type a Latitude coordinate here"  required/>
                        <p className="m-4 font-bold text-2xl">Longitude:</p>  <input type="text" className="w-3/12 h-14 m-4 rounded-xl font-bold text-2xl bg-indigo-500 bg-neutral-300	text-stone-950" value={place.long} onChange={handleChange} name="long" id="search2" placeholder="Type a Longitude coordinate here" required/>
                        <button className="bg-indigo-500 m-4 rounded-xl	w-52 h-16 font-bold text-2xl" type="submit">Search</button>
                    </form>
                </search>
                
               
            </>
        )
    }

return(
        <APIProvider apiKey={key} libraries={['places']}>

            <search className="searchForm" >
                    <form onSubmit={ (e) => {handleData(e)}} >
                      <p className="m-4 font-bold text-2xl">Latitude:</p>  <input type="text" className="w-3/12 h-14 m-4 rounded-xl font-bold text-2xl bg-indigo-500 bg-neutral-300	text-stone-950" value={place.lat} onChange={handleChange} name="lat" id="search1" placeholder="Type a Latitude coordinate here"  required/>
                      <p className="m-4 font-bold text-2xl">Longitude:</p>  <input type="text" className="w-3/12 h-14 m-4 rounded-xl font-bold text-2xl bg-indigo-500 bg-neutral-300 text-stone-950"value={place.long} onChange={handleChange} name="long" id="search2" placeholder="Type a Longitude coordinate here" required/>
                        <button className="bg-indigo-500 m-4 rounded-xl	w-52 h-16 font-bold text-2xl" type="submit">Search</button>
                    </form>
                </search>

            <Map className="map" mapId={'c23b025437a4833d'} zoom={zoom} center={{lat: parseFloat(place.lat), lng: parseFloat(place.long)}} mapContainerStyle={mapContainerStyle}>

               { dogParks?.map( (d) => (
                 <>
                    <AdvancedMarker
                    className="nameTag"
                    title={"Name: " + d.properties.address_line1} 
                    key={d.properties.place_id} 
                    position={{lat: d.properties.lat, lng: d.properties.lon}}
                    >
                    <div className="font-bold text-base italic" key={d.properties.place_id+38}>{d.properties.address_line1}</div>
                   </AdvancedMarker>
                </>
                ))}
           </Map>

       </APIProvider>
    )
}


