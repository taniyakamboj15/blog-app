import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import User from './models/User';
import Blog from './models/Blog';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    await connectDB();

    try {
        console.log('Clearing existing data...');
        await Blog.deleteMany();
        // await User.deleteMany(); // Optional: keep manually created users

        console.log('Creating users...');
        const users = [];

        // Create 10 dummy users
        for (let i = 0; i < 10; i++) {
            const user = await User.create({
                username: faker.internet.username(),
                email: faker.internet.email(),
                password: 'password123', // Default password
                role: 'author'
            });
            users.push(user);
        }

        console.log('Creating blogs...');
        const blogs = [];

        // Create 50 dummy blogs
        for (let i = 0; i < 50; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const title = faker.lorem.sentence({ min: 3, max: 8 });
            // Generate some random HTML content
            const content = `
                <p>${faker.lorem.paragraph()}</p>
                <h3>${faker.lorem.sentence()}</h3>
                <p>${faker.lorem.paragraph()}</p>
                <ul>
                    <li>${faker.lorem.sentence()}</li>
                    <li>${faker.lorem.sentence()}</li>
                </ul>
                <p>${faker.lorem.paragraph()}</p>
            `;

            const blog = await Blog.create({
                title: title.replace('.', ''),
                content,
                author: randomUser._id,
                tags: faker.word.words(5).split(' ').slice(0, 3), // Generate 5 words, take 3
                likes: [],
                language: 'en'
            });
            blogs.push(blog);
        }

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    await connectDB();

    try {
        await Blog.deleteMany();
        await User.deleteMany(); // Be careful with this one

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
