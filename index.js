import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Define the Swiggy API URL
const SWIGGY_API_URL = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.3330529&lng=83.0069298&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

// Set up a simple GET route
app.get('/', async (req, res) => {
  try {
    // Fetch data from Swiggy API
    const response = await fetch(SWIGGY_API_URL,{

      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Header to mimic browser request
      },
  });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data from Swiggy API. Status: ${response.status}`);
    }

    // Parse response as JSON
    const data = await response.json();

    // Send JSON response
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Swiggy API' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
