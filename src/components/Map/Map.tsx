import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Container, Paper, Typography, useMediaQuery } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const containerStyle = {
    display: "inline-flex",
    width: "100%",
    height: "90vh",
    borderRadius: 6,
    margin: 10,
};

const center = { lat: -3.745, lng: -38.523 };

const Map: React.FC = () => {
    const isMobile = useMediaQuery("(min-width: 600px)");

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBxreAfKT8yZi0KDAxGPMyUpFhFIFf2Ea0",
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <></>
        </GoogleMap>
    ) : (
        <></>
    );
};

export default React.memo(Map);
