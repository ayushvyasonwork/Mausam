import axios from 'axios';
import React, { useState } from 'react';
import api from './utils/api';
import { Search } from 'lucide-react';
// Importing Lucide icons
import {
  ThermometerSun,
  Wind,
  Droplets,
  SunMedium,
} from 'lucide-react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    console.log(`This is before axios POST: ${city}`);

    try {
      const response = await axios.post(`${api}/getweather`, { city });
      if (!response.data) throw new Error('City not found');
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-600 p-4 text-white flex flex-col items-center gap-4">
      <Header />
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      {error && <Error message={error} />}
      {weather && <WeatherInfo weather={weather} />}
    </div>
  );
}

const Header = () => (
  <header className="text-center py-6">
    <h1 className="text-4xl font-bold text-black">Mausam</h1>
  </header>
);

const SearchBar = ({ city, setCity, fetchWeather }) => (
  <form
    onSubmit={fetchWeather}
    className="flex items-center gap-2 bg-white/20 p-3 rounded-full shadow-lg backdrop-blur-md w-full max-w-md"
  >
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter city"
      className="flex-grow px-4 py-2 rounded-full text-black focus:outline-none bg-white/90 placeholder-gray-600"
    />
    <button
      type="submit"
      className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition duration-300"
    >
      <Search className="w-4 h-4" />
      Search
    </button>
  </form>
);
const Error = ({ message }) => (
  <div className=" text-center py-4 text-black">
    <p>Sorry, We couldn't find this city weather data </p>
  </div>
);

const WeatherInfo = ({ weather }) => (
  <div className="text-center py-8 flex flex-col items-start gap-4 px-6 bg-white/20 rounded-xl shadow-lg backdrop-blur-md w-full max-w-md">
    <h2 className="text-3xl font-bold mb-2 text-black">{weather.city}</h2>

    <div className="flex items-center gap-3 text-xl text-black">
      <ThermometerSun className="text-yellow-600 w-6 h-6" />
      <span>Temperature: {weather.temperature}°C</span>
    </div>

    <div className="flex items-center gap-3 text-xl text-black">
      <Wind className="text-blue-500 w-6 h-6" />
      <span>Wind: {weather.wind} m/sec</span>
    </div>

    <div className="flex items-center gap-3 text-xl text-black">
      <Droplets className="text-teal-400 w-6 h-6" />
      <span>Humidity: {weather.humidity}%</span>
    </div>

    <div className="flex items-center gap-3 text-xl text-black">
      <SunMedium className="text-orange-500 w-6 h-6" />
      <span>Description: {weather.description}</span>
    </div>
  </div>
);
export default App;