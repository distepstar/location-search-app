import { TimeZoneType } from "../configurations/TimeZoneConfigure";
import axios from 'axios';

export const fetchTimezone = async (lat: number, lng: number ):Promise<TimeZoneType> => {
	const data = await axios.request({
		method: 'GET',
		url: 'https://geocodeapi.p.rapidapi.com/GetTimezone',
		params: {latitude: lat, longitude: lng},
		headers: {
		'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com',
		'X-RapidAPI-Key': 'f922d12709mshf7984f926d04730p1fd929jsn9e6c0c4d3a0a'
		}
	}).then((response) =>{
		return response.data;
	}).catch((err) => {
		console.error(err)
	})


	return data;
}