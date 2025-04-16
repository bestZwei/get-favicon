// Node.js Express server for Docker deployment
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const GOOGLE_FAVICON_API = 'https://www.google.com/s2/favicons';

// Serve static index.html at root
app.get('/', (req, res, next) => {
  if (req.query.domain) return next();
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Favicon proxy: /?domain=xxx or /api/favicon?domain=xxx
app.get(['/', '/api/favicon'], async (req, res) => {
  const { domain, sz } = req.query;
  if (!domain) return res.status(400).send("Missing 'domain' parameter");
  try {
    const url = new URL(GOOGLE_FAVICON_API);
    url.searchParams.set('domain', domain);
    if (sz) url.searchParams.set('sz', sz);
    const response = await fetch(url.toString());
    if (!response.ok) return res.status(500).send('Failed to fetch favicon');
    res.set('Content-Type', response.headers.get('content-type') || 'image/x-icon');
    res.set('Cache-Control', 'public, max-age=86400');
    response.body.pipe(res);
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
});

// CORS support
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
