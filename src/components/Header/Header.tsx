import React from "react";

// Components
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import SearchBar from "../SearchBar/SearchBar";
import PinDropIcon from "@mui/icons-material/PinDrop";

const commonStyle = {
    backgroundColor: "rgb(180, 176, 255)",
};

const Header: React.FC<any> = () => {
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
                <SearchBar/>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
