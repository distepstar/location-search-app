import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, Grid } from "@mui/material";

import "./App.css";
import Header from "./components/Header/Header";
import Lists from "./components/Lists/Lists";
import SearchTable from "./components/SearchTable/SearchTable";
import Map from "./components/Map/Map";


const App: React.FC = () => {
    return (
        <div className="App">
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={5}>
                    <SearchTable />
                </Grid>
                <Grid item xs={12} md={7}>
                    <Map />
                </Grid>
            </Grid>
        </div>
    );
};

export default App;
