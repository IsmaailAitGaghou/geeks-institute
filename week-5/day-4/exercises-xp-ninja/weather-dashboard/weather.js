import axios from 'axios';
const getData = async (cityName) => {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${cityName}`);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

getData();
