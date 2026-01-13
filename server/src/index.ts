import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import connectDB from './db';

dotenv.config();

connectDB();

import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.send('Blog App Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
