import React from "react";
import { Box } from "@mui/material";
import { InputBase, Grid, Typography } from "@mui/material/";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const SearchBoxWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "block",
    alignItems: "center",
    justifyContent: "center",
}));

const SearchBoxBorder = styled(Box)(({ theme }) => ({
    margin: 0.5,
    border: "2.5px solid white",
    backgroundColor: "rgba(245, 40, 145, 0.2)",
    "&:hover": {
        backgroundColor: "rgba(245, 40, 145, 0.25)",
    },
    height: "3.5rem",
    borderRadius: 10,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        width: "auto",
    },
    [theme.breakpoints.down("sm")]: {
        width: "10rem",
    },
}));

const InputBaseTras = styled(InputBase)(({ theme }) => ({
    color: "white",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(${theme.spacing(2)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "20ch",
            "&:focus": {
                width: "25ch",
            },
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "13px",
            paddingLeft: theme.spacing(1),
        },
    },
}));

const SearchBar: React.FC = () => {
    return (
        <Grid
            container
            sx={{
                justifyContent: "flex-end",
                alignItems: "center",
                width: "85%",
            }}
        >
            <Typography
                variant="inherit"
                noWrap
                component="div"
                position="relative"
                sx={{
                    display: { xs: " none", sm: "flex" },
                    paddingRight: 2,
                }}
            >
                Search your location here
            </Typography>
            <SearchBoxWrapper className="location-search-box">
                <SearchBoxBorder>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: 0.8,
                        }}
                    >
                        <SearchIcon sx={{ display: "inline-block" }} />
                        <InputBaseTras
                            className="location-search-input"
                            inputProps={{ "aria-label": "search" }}
                            placeholder="Search location"
                        />
                    </Box>
                </SearchBoxBorder>
            </SearchBoxWrapper>
        </Grid>
    );
};

export default SearchBar;
