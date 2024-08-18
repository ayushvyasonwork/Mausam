const axios = require('axios');

// Example: using OpenWeatherMap API
const apiKey = process.env.API_KEY; // Replace with your API key

const getData = async (req, res) => {
  // Access `city` from either `req.body.city` or `req.params.city`
  const city = req.body.city ;

  // Ensure that `city` is defined
  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    // Make a request to the weather API
    console.log(`This is before API call: ${city}`);
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    // Send back the weather data
    res.status(200).json({
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching weather data:', error.response?.data || error.message);

    res.status(500).json({
      message: 'Error fetching weather data',
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { getData };
