import React, { useContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles" 
import { LastPage, FirstPage, KeyboardArrowLeftSharp, KeyboardArrowRightSharp, LocationSearchingTwoTone } from "@mui/icons-material";
import { Box, FormControlLabel, IconButton, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Checkbox, Button } from '@mui/material'
import { LocationContext } from "../../MapContext";
import { ILocationInfo, IMarkerInfo } from "../../App";
import { MarkerType } from "../../configurations/MapConfigure";

interface IChildLocationInfo extends ILocationInfo {
    updateSelected: (id: number, event: React.ChangeEvent<HTMLInputElement>) => void
}

// Pagination
interface ILocationTablePagination{
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void
}

// Global scope functions

const TablePaginationActions = (props:ILocationTablePagination) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = ( event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    }

    const handleBackPageButtonClick = ( event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    }

    const handleNextPageButtonClick = ( event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    }

    const handleLastPageButtonClick = ( event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPage/> : <FirstPage/>}
            </IconButton>
            <IconButton
                onClick={handleBackPageButtonClick}
                disabled={page === 0}
                aria-label="back page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRightSharp/> : <KeyboardArrowLeftSharp/>}
            </IconButton>
            <IconButton
                onClick={handleNextPageButtonClick}
                disabled={page >= Math.ceil(count/rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeftSharp/> : <KeyboardArrowRightSharp/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count/rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPage/> : <LastPage/>}
            </IconButton>

        </Box>
    );
}

// Data
// Custom components

const CustomTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]:{
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]:{
        fontSize: 14
    },

}));


const CustomeCheckBox = styled(Checkbox)(({theme}) => ({
    alignItems: 'center',
    color: 'rgba(230, 230, 230, 0.8)'
}));

const CustomDeleteButton = styled(Button)(({theme}) => ({
    color: 'white',
    border: '1px solid white',
    width: '100px',
    borderRadius: '4px',
    backgroundColor: 'rgba(245, 29, 29, 0.8)',
    "&:hover":{
        backgroundColor: 'rgba(255, 29, 29, 0.8)',
    }
}));


const SearchTableBody: React.FC<IChildLocationInfo> = ({location, updateSelected}) => {
    return (
        <TableRow>
            <TableCell>
                <FormControlLabel
                    label={undefined}
                    control={ <CustomeCheckBox checked={location.selected} onChange={e => updateSelected(location.id, e)}/>}
                />
            </TableCell>
            <TableCell align="center">{location.location}</TableCell>
            <TableCell align="center">{location.time}</TableCell>
            <TableCell align="center">{location.postal}</TableCell>
            <TableCell align="center">{`lat: ${location.geo.lat}, lng: ${location.geo.lng}`}</TableCell>
            <TableCell align="center"></TableCell>
        </TableRow>
    )
}

const SearchTable: React.FC<any> = () =>{
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isAllSelected, setIsAllSelected] = useState<boolean[]>([false, false]);
    const {locations, setLocations } = useContext(LocationContext);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - locations.length) : 0

    const updateSelected = ((id: number, event: React.ChangeEvent<HTMLInputElement>) : void =>{
        let checked = event.target.checked;
        let count = 0;

        setLocations(locations.map(d => {
            if(d.location.id == id){
                d.location.selected = checked;
            }
            return d;
        }));

        locations.forEach(d => {
            if(d.location.selected === true){
                count++;
            }
        });

        if(isAllSelected[0] === true && count >= locations.length || isAllSelected[0] === false && count >= locations.length){
            setIsAllSelected([true, true]);
        }else if(isAllSelected[0] === true && count > 0 || isAllSelected[0] === false && count > 0){
            setIsAllSelected([false, true]);
        }else{
            setIsAllSelected([false, false]);
        }

    });

    const deleteSelectedItems = ((event: React.MouseEvent<HTMLButtonElement>) =>{
        setLocations(locations.filter(d => {
            return d.location.selected !== true;
        }));


        setIsAllSelected([false, false]);
    })

    const handleAllSelectedChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
        let checked = event.target.checked;
        setIsAllSelected([checked, checked]);
        setLocations(locations.map(d =>{
            d.location.selected = checked;
            return d;
        }));
    })

    const handlePageChange = ((event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) =>{
        setPage(newPage)
    })
    
    const handleRowPerPageChange = ((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    })

    return(
        <TableContainer component={Paper} sx={{ marginLeft: 2, marginTop: 1}}>
            <Table sx={{ minWidth: 600 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <CustomTableCell> 
                            <FormControlLabel
                                label={undefined}
                                control={
                                    <CustomeCheckBox
                                        key={"location-all-select"}
                                        checked={isAllSelected[0] && isAllSelected[1]}
                                        indeterminate={isAllSelected[0] !== isAllSelected[1]}
                                        onChange={e => handleAllSelectedChange(e)}/>
                                }
                            />
                        </CustomTableCell>
                        <CustomTableCell align="center"> Location </CustomTableCell>
                        <CustomTableCell align="center"> Search Time </CustomTableCell>
                        <CustomTableCell align="center"> Postal Code </CustomTableCell>
                        <CustomTableCell align="center"> Geometry </CustomTableCell>
                        <CustomTableCell align="center">
                            <CustomDeleteButton key="locations-button-delete" onClick={e => deleteSelectedItems(e)}>Delete</CustomDeleteButton>
                        </CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? locations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : locations).map((location, i) => {
                            return(
                                <SearchTableBody key={`location-row-${i}`} location={location.location} updateSelected={updateSelected}/>
                            );
                    })}
                    {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows}}>
                                <TableCell colSpan={4}></TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 40, {label: 'All', value: -1}]}
                            colSpan={6}
                            count={locations.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            labelDisplayedRows={() =>{
                                return `${page+1} - ${Math.floor(locations.length / rowsPerPage)+1}`;
                            }}
                            SelectProps={{
                                inputProps:{
                                    'aria-label': 'rows per page'
                                },
                                native: true
                            }}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowPerPageChange}
                            ActionsComponent={TablePaginationActions}
                        />
                        </TableRow>
                </TableFooter>

            </Table>
        </TableContainer>
    )
}

export default SearchTable;
