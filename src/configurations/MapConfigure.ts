export const containerStyle = {
    display: "inline-flex",
    width: "100%",
    height: "90vh",
    borderRadius: 6,
    margin: 10,
};

export const center = {lat: 43.65, lng: -79.34};

export const options:google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true
}

export type MarkerType = {
    id: string;
    postal_code: string;
    address: string;
    location: google.maps.LatLngLiteral;
}