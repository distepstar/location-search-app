import React from 'react';
import ReactDOM from 'react-dom';

// Components
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import SearchBar from '../SearchBar/SearchBar';
import PinDropIcon from '@mui/icons-material/PinDrop';


const commonStyle = {
	backgroundColor: 'rgb(180, 176, 255)',
}

const Header: React.FC = () =>{
	return (
		<AppBar position="static">
			<Toolbar sx={{...commonStyle, display: 'flex'}}>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="open drawer"
					sx={{ mr: {xs: '1', lg: '2'}, display: {xs: 'flex', lg: 'none'} }}
				>
					<ListIcon/>
				</IconButton>

				<Typography
					variant='h6' 
					noWrap
					component="div" 
					sx= {{ fontSize: {xs: '15px', lg: '20px'},  ml: { xs: '0', lg: '2'}, flexGrow: 1, display: 'flex', alignItems: 'center' }}
				>
					<PinDropIcon />
					Location Search
				</Typography>		

				<SearchBar/>

			</Toolbar>
		</AppBar>
	)
}


export default Header;
