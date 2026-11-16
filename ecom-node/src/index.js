const dotenv = require('dotenv');
dotenv.config();

// 2. Load Core Libraries
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const compression = require('compression');

// 3. Load Configs
const connectDB = require('./config/db');
const swaggerSetup = require('./config/swagger');
const { initData } = require('./config/initData');

// 4. Route imports
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const addressRoutes = require('./routes/address.routes');
const analyticsRoutes = require('./routes/analytics.routes');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB().then(() => initData());

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
];
if (process.env.FRONTEND_URL) {
  const cleanFrontendUrl = process.env.FRONTEND_URL.replace(/\/+$/, '');
  if (!allowedOrigins.includes(cleanFrontendUrl)) {
    allowedOrigins.push(cleanFrontendUrl);
  }
}

// Compress all HTTP responses (reduces base64 JSON payload from 500KB to ~100KB)
app.use(compression());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const cleanOrigin = origin.replace(/\/+$/, '');
    const isLocalhost = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(cleanOrigin);
    const isVercel = /\.vercel\.app$/.test(cleanOrigin);
    const isAllowed = allowedOrigins.includes(cleanOrigin);

    if (isLocalhost || isVercel || isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files (images) with 1-day browser caching
const imagePath = path.join(process.cwd(), 'images');
app.use('/images', express.static(imagePath, { maxAge: '1d' }));

// Lightweight ping & health endpoints for zero-overhead wake-up and monitoring
app.get('/api/ping', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: Date.now() });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'E-Shop Backend API is up and running!',
    documentation: '/api-docs'
  });
});

// Swagger docs
swaggerSetup(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', addressRoutes);
app.use('/api', analyticsRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("🚨 GLOBAL ERROR HANDLER CAUGHT:", err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    status: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});

// Render Free Tier Keep-Alive Self-Ping
// Automatically pings the server every 14 minutes to prevent idle spin-down
if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
  const BACKEND_URL = process.env.BACKEND_URL || 'https://e-shop-4fgk.onrender.com';
  const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes
  setInterval(async () => {
    try {
      if (typeof fetch === 'function') {
        const pingRes = await fetch(`${BACKEND_URL}/api/ping`);
        console.log(`[Keep-Alive Ping] Status: ${pingRes.status} at ${new Date().toISOString()}`);
      }
    } catch (err) {
      console.warn(`[Keep-Alive Ping] Warning: ${err.message}`);
    }
  }, PING_INTERVAL);
}

module.exports = app;
