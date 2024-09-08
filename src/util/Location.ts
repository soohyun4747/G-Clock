import axios from 'axios';

export interface IPResponse {
	query: string;
	status: string;
	country: string;
	countryCode: string;
	region: string;
	regionName: string;
	city: string;
	zip: string;
	lat: number;
	lon: number;
	timezone: string;
	isp: string;
	org: string;
	as: string;
}

export const getLocation = async () => {
	return await axios.get('http://ip-api.com/json');
};

export const getTimeZoneFromCoordinates = async (
	latitude: number,
	longitude: number
) => {
	const apiKey = '623fa70028ad4f83920832579b8afd85'; // Replace with your OpenCage API key
	const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`;

	const response = await axios.get(apiUrl);
	return response;
};
