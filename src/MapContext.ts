import { createContext } from "react";
import { ILocationInfo, IMarkerInfo } from "./App";

interface ILocationContext {
    locations: ILocationInfo[];
    setLocations: React.Dispatch<React.SetStateAction<ILocationInfo[]>>;
    markerPos: IMarkerInfo[];
    setMarkerPos: React.Dispatch<React.SetStateAction<IMarkerInfo[]>>
}

const defaultLocationData = {
    locations: [{
        location:{
            id: 0,
            selected: false,
            location: "",
            time: "",
            postal: "",
            geo: {lat: 0, lng: 0},
        },
    }],
    setLocations: () => {},
    markerPos: [
        {
            id: 0,
            geo: {lat: 0, lng: 0}
        }
    ],
    setMarkerPos: () => {}
};

export const LocationContext = createContext<ILocationContext>(defaultLocationData);