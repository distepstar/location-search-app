import React, { useCallback, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
// API Calls
import { useQuery } from "react-query";
import { fetchPlaces } from "./apis/TrueWayPlacesAPI";

import { CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import SearchTable from "./components/SearchTable/SearchTable";
import Map from "./components/Map/Map";
import "./App.css";
import { LocationContext } from "./MapContext";
import AutocompleteSearch from "./components/Header/Test";

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

const App: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'location-map-component',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY!
    });
    
    const [locations, setLocations] = useState<ILocationInfo[]>([]);
    // For fetching data
    const [clickedPos, setClickedPos] = useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral);
    const [markerPos, setMarkerPos] = useState<IMarkerInfo[]>([]);

    const mapRef = useRef<google.maps.Map | null>(null);

    const {data: nearByPositions, isLoading, isError} = useQuery([clickedPos.lat, clickedPos.lng], () => fetchPlaces(clickedPos.lat, clickedPos.lng), {
        enabled: !!clickedPos.lat,
        refetchOnWindowFocus: false,
    });

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

    return (
        <div className="App">
            <CssBaseline />
            <LocationContext.Provider value={{ locations, setLocations, markerPos, setMarkerPos}}>
                <Header />
                {/* <AutocompleteSearch/> */}
                <Grid container spacing={3} style={{ width: "100%" }}>
                    <Grid item xs={12} md={5}>
                        <SearchTable isLoading={isLoading} isError={isError} nearByPositions={nearByPositions}/>
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
