import React, {useContext, useEffect } from "react";
import { GoogleMap, Marker } from '@react-google-maps/api';
import { LocationContext } from "../../MapContext";
import { Box, Skeleton, } from "@mui/material";
import { containerStyle, options, center } from "../../configurations/MapConfigure";
import { IMarkerInfo } from "../../App";


const MapComponent : React.FC<any> = ({onLoad, onUnmount, onMapClick}) => {
    const {locations, setLocations, markerPos, setMarkerPos} = useContext(LocationContext);

    const handleMapOnClick = (event: google.maps.MapMouseEvent) => {
        onMapClick(event);
    }

    const filterMarkerList = (array:IMarkerInfo[]) => {
        return array.filter(d=>{return locations.find((location) =>{
            return d.id === location.location.id;
        })});
    }

    useEffect(() =>{
        let markerArr: IMarkerInfo[] = markerPos;
        if(markerArr.length != locations.length){
            markerArr = filterMarkerList(markerArr);
            setMarkerPos(markerArr);
        }
    }, [locations])


    return(
        <Box>
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={options}
                center={center}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapOnClick}
            >

                {markerPos.map((position)=>{
                    return(
                        position.geo.lat ? <Marker key={`marker_on_map_${position.id}`} position={position.geo}></Marker> : null
                    )
                })}
            </GoogleMap>
        </Box>
    )
};

const Map: React.FC<any> = ({isLoaded, onLoad, onUnmount, onMapClick}) =>{

    if(!isLoaded) return <Skeleton></Skeleton>

    return (
        <Box>
            <MapComponent onLoad={onLoad} onUnmount={onUnmount} onMapClick={onMapClick}/>
        </Box>
    )
}

export default Map;

