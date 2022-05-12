import { MarkerType } from "../configurations/MapConfigure";
const axios = require("axios");

export const fetchPlaces = async (lat: number, lng: number ):Promise<MarkerType[]> => {
	const data = await axios.request({
		method: 'GET',
		url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
		params: {location: `${lat},${lng}`, language: 'en'},
		headers: {
			'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com',
			'X-RapidAPI-Key': 'f922d12709mshf7984f926d04730p1fd929jsn9e6c0c4d3a0a'
		}
	}).then((response:any) => {
		return response.data.results;
	}).catch((err:any) =>{
		console.error(err);
	})

	return data;
}