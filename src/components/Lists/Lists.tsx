import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { List, Box } from "@mui/material";
import ListItems from "./ListItems";
import SearchTable from "../SearchTable/SearchTable"

const SearchList = styled(List)(({ theme }) => ({
    width: "100%",
    height: "90vh",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "relative",
    overflow: "auto",
}));

interface ILocationInfo {
    locations: {
        location: string;
        time: string;
        postal: string;
        geo: string;
    }[];
}

const Lists: React.FC = () => {
    const locations = [
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
        {
            location: "Toronto",
            time: "12:02:02",
            postal: "L1V3W6",
            geo: "lat: 12, lng: 12",
        },
    ];

    return (
        // <SearchList>
        //     {locations?.map((location, i) => {
        //         return <ListItems key={i} location={location} />;
        //     })}
        // </SearchList>
        <Box sx={{ width: '100%' }}>
            <SearchTable></SearchTable>
        </Box>
    );
};

export default Lists;
