import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Typography,
    ListItem,
    Card,
    CardContent,
    Checkbox,
    Grid,
} from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import TerrainIcon from "@mui/icons-material/Terrain";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";

interface ILocationInfo {
    location: {
        location: string;
        time: string;
        postal: string;
        geo: string;
    };
}

const SearchItem = styled(ListItem)(({ theme }) => ({}));

const InnerCard = styled(Card)(({ theme }) => ({
    width: "100%",
}));

const ListItems: React.FC<ILocationInfo> = ({ location }) => {
    return (
        <SearchItem>
            <InnerCard>
                <Grid container>
                    <Checkbox />
                    <CardContent>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                textDecoration: "underline",
                            }}
                        >
                            <PinDropIcon />
                            {location.location}
                        </Typography>
                        <Typography
                            variant="inherit"
                            noWrap
                            component="div"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "medium",
                            }}
                        >
                            <AccessTimeFilledIcon sx={{ fontSize: "medium" }} />
                            <div style={{ paddingLeft: "5px" }}>
                                {location.time}
                            </div>
                        </Typography>
                        <Typography
                            variant="inherit"
                            noWrap
                            component="div"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <LocalPostOfficeIcon sx={{ fontSize: "medium" }} />
                            <div style={{ paddingLeft: "5px" }}>
                                {location.postal}
                            </div>
                        </Typography>
                        <Typography
                            variant="inherit"
                            noWrap
                            component="div"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "medium",
                            }}
                        >
                            <TerrainIcon sx={{ fontSize: "medium" }} />
                            <div style={{ paddingLeft: "5px" }}>
                                {location.geo}
                            </div>
                        </Typography>
                    </CardContent>
                </Grid>
            </InnerCard>
        </SearchItem>
    );
};

export default ListItems;
