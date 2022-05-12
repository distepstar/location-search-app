import React, { useContext, useEffect, useState } from "react";

// Components
import { AppBar, Toolbar, IconButton, Typography, Button, Grid } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import SearchBar from "../SearchBar/SearchBar";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { TimeZoneType } from "../../configurations/TimeZoneConfigure";
import { useQuery } from "react-query";
import { fetchTimezone } from "../../apis/RGGSAPI";
import { LocationContext } from "../../MapContext";
import { MarkerType } from "../../configurations/MapConfigure";

const commonStyle = {
    backgroundColor: "rgb(180, 176, 255)",
};

interface IHeaderInfo{
    placeData: MarkerType[] | undefined;
    clickedPos:google.maps.LatLngLiteral;
    onSelfLocationClick: any;
}
const defaultLocalTime = () =>{
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
}


const Header: React.FC<IHeaderInfo> = ({placeData, clickedPos, onSelfLocationClick}) => {
    const [localTime, setLocalTime] = useState<string>(defaultLocalTime);
    const {locations, setLocations} = useContext(LocationContext);

    const {data: timeData, error: timeError, isLoading: timeLoading} = useQuery([clickedPos.lat, clickedPos.lng], () => fetchTimezone(clickedPos.lat, clickedPos.lng), {
        enabled: !!placeData,
        refetchOnWindowFocus: false,
    });
    
    useEffect(() =>{
        let time: TimeZoneType | undefined = undefined;

        if(!timeLoading){
            time = timeData;
            if(time){
                console.log(time);
                let timeZoneName = time!.TimeZoneName;
                let localTimeNow = time!.LocalTime_Now;
                
                if(timeZoneName !== undefined && localTimeNow !== undefined){
                    let newTime = timeZoneName + ", " +  localTimeNow;
                    console.log(newTime);
                    setLocalTime(newTime);
                }
            } 
        }
    }, [timeLoading, timeError, timeData])

    return (
        <AppBar position="static">
            <Toolbar sx={{ ...commonStyle, display: "flex" }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{
                        mr: { xs: "1", lg: "2" },
                        display: { xs: "flex", md: "none" },
                    }}
                >
                    <ListIcon />
                </IconButton>

                <PinDropIcon />
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        display: { xs: "none", md: "flex" },
                        fontSize: { xs: "15px", sm: "20px" },
                        ml: { xs: "0", lg: "4" },
                        flexGrow: 1,
                        alignItems: "center",
                    }}
                >
                    Location Search
                </Typography>

                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        display: { xs: "none", md: "flex" },
                        fontSize: { xs: "15px", sm: "20px" },
                        ml: { xs: "0", lg: "6" },
                        flexGrow: 1,
                        alignItems: "center",
                    }}
                >
                    Timezone: {localTime}
                </Typography>

                <Grid
                    container
                    sx={{
                        justifyContent: "flex-end",
                        alignItems: "center",
                        width: "60vw"
                    }}
                >
                    <Button 
                        id="get-current-location-button"
                        variant="contained"
                        sx={{
                            display: 'flex',
                            width: '150px',
                            color: 'white',
                            marginRight: 2
                        }}
                        onClick={onSelfLocationClick}
                    >
                        Get Current Location
                    </Button>
                    {/* <SearchBar/> */}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
