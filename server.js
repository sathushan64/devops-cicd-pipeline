const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Structured logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: duration
    }));
  });
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'CI/CD Pipeline Running Successfully!',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint for monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Prevent listening when imported during automated testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;