const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedAdmin = async () => {
    try {
        await User.deleteMany();

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123', // This will be hashed by the User model's pre-save middleware
            isAdmin: true,
        });

        console.log('Admin User Created!');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedAdmin();
