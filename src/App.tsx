import React, { PureComponent, useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import { useJsApiLoader } from "@react-google-maps/api";
// API Calls
import {  useQuery } from "react-query";
import { fetchPlaces } from "./apis/TrueWayPlacesAPI";

import { CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import SearchTable from "./components/SearchTable/SearchTable";
import Map from "./components/Map/Map";
import { LocationContext } from "./MapContext";
import { MarkerType } from "./configurations/MapConfigure";

export interface ILocationInfo {
    location:{
        id: number;
        selected: boolean;
        location: string;
        time: string;
        postal: string;
        geo: google.maps.LatLngLiteral;
    },
}

export interface IMarkerInfo{
    id: number;
    geo: google.maps.LatLngLiteral;
}

interface IGeoLocaion{
    loaded: boolean;
    coordination?: {
        lat: number;
        lng: number;
    };
    error?:{
        code: number;
        message: string;
    }
}

const geoInitState:IGeoLocaion = {
    loaded: false,
    coordination: {lat: 0, lng: 0},
}

export const useGeoLocation = () =>{
    const [location, setLocation] = useState<IGeoLocaion>(geoInitState);

    const onSuccess:PositionCallback = location =>{
        setLocation({
            loaded: true,
            coordination:{
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        })
    }

    const onError:PositionErrorCallback = error =>{
        setLocation({
            loaded: true,
            error: error
        })
    }

    useEffect(() =>{
        if(!("geolocation" in navigator)){
            onError;
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [location])

    return {location, setLocation};
}

// Autocomlpete
declare type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
const libraries:Libraries = ['places'];

const App: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'location-map-component',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY!,
        libraries
    });
    
    const [locations, setLocations] = useState<ILocationInfo[]>([]);
    // For fetching data
    const [clickedPos, setClickedPos] = useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral);
    const [markerPos, setMarkerPos] = useState<IMarkerInfo[]>([]);
    const selfLocation = useGeoLocation();

    const mapRef = useRef<google.maps.Map | null>(null);
    const searchInput = useRef(null);

    const {data: placeData, error: placeError, isLoading: placeLoading} = useQuery([clickedPos.lat, clickedPos.lng], () => fetchPlaces(clickedPos.lat, clickedPos.lng), {
        enabled: !!clickedPos.lat,
        refetchOnWindowFocus: false,
    });
   

    const isLoading = placeLoading;

    const onLoad = useCallback( (map: google.maps.Map):void => {
        mapRef.current = map;
    }, []); 

    const onUnmount = useCallback(():void =>{
        mapRef.current = null;
    }, []); 

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        // Getting nearest location
        setClickedPos({lat: e.latLng!.lat(), lng: e.latLng!.lng()});
    }
    const onSelfLocationClick = () =>{
        if(selfLocation.location.loaded){
            setClickedPos({lat: selfLocation.location.coordination!.lat, lng: selfLocation.location.coordination!.lng});
        }
    }

    const createData = ((id: number, location: string, time: string, postal: string, geo: google.maps.LatLngLiteral):ILocationInfo => {
        return {
            location:{
                id: id,
                selected: false,
                location: location,
                time: time,
                postal: postal,
                geo: geo
            }
    }});

    const addToTable = (id: number, lat: number, lng: number, near:MarkerType) =>{
        const postalCode = near.postal_code;
        let address = near.address;
        address = address.replace(`${postalCode},`, "");

        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


        let getObj = createData(id, address, time, postalCode, {lat: lat, lng: lng});
        setLocations([...locations, getObj]);
    }

    // Autocomplete change address
    const onChangeAddress = (autocomplete: google.maps.places.Autocomplete) => {
        const location = autocomplete.getPlace();
        
        if(location !== undefined){
            if(location.geometry !== undefined){

                const lat: number | undefined = location.geometry!.location!.lat();
                const lng: number | undefined = location.geometry!.location!.lng();
                if(lat !== undefined && lng !== undefined){
                    setClickedPos({lat: lat, lng: lng});
                }
            }
        }
    }

    const initAutoComplete = () =>{
        if(!searchInput.current) return;

        if(window.google){
            console.log("Pass in");

            // const autocomplete = new google.maps.places.Autocomplete(searchInput.current);
            const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
            autocomplete.setFields(["address_component", "geometry"])
            autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
        }
    }

    useEffect(() =>{

        if(window.google){
            initAutoComplete();
        }

        let nears:MarkerType[] | undefined = undefined;

        if(!isLoading){
            nears = placeData;
            if(nears){
                let near = nears[Math.min(0, nears.length - 1)];
                const locationObjId = locations.length > 0 ? locations[locations.length - 1].location.id + 1 : 0;
                const roundedLat = Number((Math.round(near.location.lat * 100) / 100).toFixed(2));
                const roundedLng = Number((Math.round(near.location.lng * 100) / 100).toFixed(2));

                // add searched location to pagination table
                addToTable(locationObjId, roundedLat, roundedLng, near);
                // get clicked geolocation and set marker to map
                let geoLocation = {lat: clickedPos.lat, lng: clickedPos.lng};
                setMarkerPos([...markerPos, {id: locationObjId, geo: geoLocation}]);
                mapRef.current!.panTo(geoLocation);
                mapRef.current!.setZoom(15);
                mapRef.current!.setCenter(geoLocation);
            }
        }

    }, [isLoading, placeError, mapRef.current])


    return (
        <div className="App">
            <CssBaseline />
            <LocationContext.Provider value={{ locations, setLocations, markerPos, setMarkerPos}}>
                <Header placeData={placeData} clickedPos={clickedPos} onSelfLocationClick={onSelfLocationClick}/>
                <Grid container spacing={3} style={{ width: "100%" }}>
                    <Grid item xs={12} md={5}>
                        <input ref={searchInput}
                            type="text"
                            placeholder="Search Location......" 
                            style={
                                {
                                    display: "flex", 
                                    margin: 20, 
                                    width: "100%", 
                                    height: "50px",
                                    border: "2px solid black",
                                    borderRadius: "10px",
                                    fontSize: "20px"
                                }
                            }>
                        </input>
                        <SearchTable />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Map 
                        isLoaded={isLoaded} 
                        onLoad={onLoad} 
                        onUnmount={onUnmount} 
                        onMapClick={onMapClick}
                        />
                    </Grid>
                </Grid>
            </LocationContext.Provider>
        </div>
    );
};

export default App;
