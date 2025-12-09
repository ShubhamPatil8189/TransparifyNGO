import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRouter from '../src/routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:4000',
  'http://localhost:5000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['PUT', 'GET', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Origin', 'Accept', 'Authorization'],
  exposedHeaders: ['Authorization'],
  credentials: true
}));

// MongoDB Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', indexRouter);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
