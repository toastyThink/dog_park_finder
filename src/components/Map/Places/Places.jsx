
// import { useState, useEffect } from "react";
// import {useMapsLibrary} from '@vis.gl/react-google-maps';
// import config from '../../../config/config.jsx';
// import '../MapComponent.css'

// const key = config.PLACE_KEY

// function Places(){
//     const [place, setPlace] = useState({
//         lat: "",
//         long: ""
// })
 
    // const placesLibrary = useMapsLibrary('places');
    // const [placesService, setPlacesService] = useState(null)
    
    // useEffect(() => {
    // if(!placesLibrary) return(console.log('api library not connected'));
    
    // },[placesLibrary]);

    // useEffect(()=>{
    //     if(!placesService) return(console.log('placesService not connected'))
    // }, [placesService]);

//  async function handleSubmit(e){
//     e.preventDefault()
//     const latValue = e.currentTarget.latitude.value;
//     const longValue = e.currentTarget.longitude.value;
//     setPlace({...place.lat = latValue});
//     setPlace({...place.long = longValue});

//     console.log(place)

    //   console.log(place)
    //     const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Cgeometry&input=${place}&inputtype=textquery&key=${key}`;
        
    //     try{
    //         const response = await fetch(url, {method: "GET", mode:});
    //         console.log(response)
    //         const data = await response.json();
    //         console.log(data)
    //     }catch(err){
    //         console.log(err)
    //     }
    //}



   // useEffect(() => {
//         handleSubmit
//     },[])

//     return (
//     <> 
//         <search className="searchForm" >
//             <form onSubmit={ (e) => {handleSubmit(e)}} >
//                 <input type="text" name="latitude" id="search1" placeholder="Type a Latitude here" />
//                 <input type="text" name="longitude" id="search2" placeholder="Type a Longitude here" />
//                 <button type="submit">Search</button>
//             </form>
//         </search>
//     </>
//     )
// }

// export default Places
