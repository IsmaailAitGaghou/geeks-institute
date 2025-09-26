import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;

const getCity = async (cityName) => {
    

    try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`
        );
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

const getCoordinates = async (cityName) => {
    const cityData = await getCity(cityName);
    if (cityData && cityData.length > 0) {
        const { lat, lon } = cityData[0];
        return { lat, lon };
    }
    return null;
};

const getWeather = async (lat, lon) => {
    try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }  
}