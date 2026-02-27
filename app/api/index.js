const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API Base URL
const API_BASE_URL = 'https://www.sankavollerei.com/anime';

// Request headers
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
};

// Proxy middleware
const proxyRequest = async (req, res, endpoint) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await axios.get(url, { 
      headers,
      timeout: 30000,
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch data',
      message: error.message
    });
  }
};

// Samehadaku Routes
app.get('/api/samehadaku/home', (req, res) => proxyRequest(req, res, '/samehadaku/home'));
app.get('/api/samehadaku/recent', (req, res) => proxyRequest(req, res, '/samehadaku/recent'));
app.get('/api/samehadaku/popular', (req, res) => proxyRequest(req, res, '/samehadaku/popular'));
app.get('/api/samehadaku/ongoing', (req, res) => proxyRequest(req, res, '/samehadaku/ongoing'));
app.get('/api/samehadaku/completed', (req, res) => proxyRequest(req, res, '/samehadaku/completed'));
app.get('/api/samehadaku/movies', (req, res) => proxyRequest(req, res, '/samehadaku/movies'));
app.get('/api/samehadaku/search', (req, res) => proxyRequest(req, res, '/samehadaku/search'));
app.get('/api/samehadaku/schedule', (req, res) => proxyRequest(req, res, '/samehadaku/schedule'));
app.get('/api/samehadaku/genres', (req, res) => proxyRequest(req, res, '/samehadaku/genres'));
app.get('/api/samehadaku/genres/:genreId', (req, res) => proxyRequest(req, res, `/samehadaku/genres/${req.params.genreId}`));
app.get('/api/samehadaku/anime/:animeId', (req, res) => proxyRequest(req, res, `/samehadaku/anime/${req.params.animeId}`));
app.get('/api/samehadaku/episode/:episodeId', (req, res) => proxyRequest(req, res, `/samehadaku/episode/${req.params.episodeId}`));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Export for Vercel
module.exports = app;

// Start server locally
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
