import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles" 
import { LastPage, FirstPage, KeyboardArrowLeftSharp, KeyboardArrowRightSharp } from "@mui/icons-material";
import { Box, FormControlLabel, IconButton, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Checkbox } from '@mui/material'

interface ILocationInfo {
    location:{
        id: number;
        selected: boolean;
        location: string;
        time: string;
        postal: string;
        geo: string;
    },
}

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

// For sorting order
const descendingComparator = (<T extends unknown>(a: T, b: T, orderBy: keyof T) =>{
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
});

type Order =  'asc' | 'desc';

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
const createData = ((location: string, time: string, postal: string, geo: string):ILocationInfo => {
    return {
        location:{
            id: 1,
            selected: false,
            location: location,
            time: time,
            postal: postal,
            geo: geo
        }
    }});



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
}))


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
            <TableCell align="center">{location.geo}</TableCell>
        </TableRow>
    )
}


const SearchTable: React.FC = () =>{
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [locations, setLocations] = useState<ILocationInfo[]>([]);
    const [isAllSelected, setIsAllSelected] = useState<boolean[]>([false, false]);
    
    useEffect(() =>{
        const rows: ILocationInfo[] = [
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Hamilton", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Toronto", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
            createData("Pickering", "12:00:00", "L5V2E2", "lat: 2.2, lnt: 3.3"),
        ];

        setLocations(rows.map((d, i) =>{
            return {
                location:{
                    id: i,
                    selected: d.location.selected,
                    location: d.location.location,
                    time: d.location.time,
                    postal: d.location.postal,
                    geo: d.location.geo,
                }
            }
        }));

    }, []);

    
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
                        <CustomTableCell align="center"> Time </CustomTableCell>
                        <CustomTableCell align="center"> Postal Code </CustomTableCell>
                        <CustomTableCell align="center"> Geometry </CustomTableCell>
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
                            colSpan={4}
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
