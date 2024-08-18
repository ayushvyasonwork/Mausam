import axios from 'axios';
import React, { useState } from 'react';
import api from './utils/api';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    console.log(`This is before axios POST: ${city}`);

    try {
      // Make a POST request with the city in the request body
      const response = await axios.post(`${api}/api/v1/getweather`, { city });

      if (!response.data) throw new Error('City not found');
      
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-200 to-red-600 p-4 text-white flex flex-col items-center">
      <Header />
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      {error && <Error message={error} />}
      {weather && <WeatherInfo weather={weather} />}
    </div>
  );
}

const Header = () => (
  <header className="text-center py-6">
    <h1 className="text-4xl font-bold">Weather App</h1>
  </header>
);

const SearchBar = ({ city, setCity, fetchWeather }) => (
  <div className="flex justify-center py-4">
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter city"
      className="p-2 rounded-l-md text-black"
    />
    <button
      onClick={fetchWeather}
      className="p-2 bg-blue-700 rounded-r-md hover:bg-blue-800 transition duration-300"
    >
      Search
    </button>
  </div>
);

const Error = ({ message }) => (
  <div className="text-red-500 text-center py-4">
    <p>{message}</p>
  </div>
);

const WeatherInfo = ({ weather }) => (
  <div className="text-center py-8 flex flex-col  items-start">
    <h2 className="text-2xl font-semibold">{weather.city}</h2>
    <p className="text-xl">temperature - {weather.temperature}°C</p>
    <p className="text-xl">wind - {weather.wind}m/sec</p>
    <p className="text-xl">humidity-{weather.humidity}%</p>
    <p>description - {weather.description}</p>
  </div>
);

export default App;
