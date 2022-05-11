import { MarkerType } from "../configurations/MapConfigure";

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com',
		'X-RapidAPI-Key': 'f922d12709mshf7984f926d04730p1fd929jsn9e6c0c4d3a0a'
	}
};

export const fetchPlaces =  async (lat: number, lng: number ):Promise<MarkerType[]> => {
	const res = await fetch(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${lat}%2C${lng}&language=en`, options);

    if(!res.ok){
        throw new Error("Fetch data from True way places API Failed");
    }

	const data = await res.json();
	console.log(data.results);
	return data.results;
}	
