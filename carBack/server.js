require('dotenv').config();
const express = require('./config/express')
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
// const upload = multer({ dest: 'assests/'})

// Set default values if not provided in the .env file
const defaultPort = 5001;
const defaultMongoURI = 'mongodb://127.0.0.1:27017/Car_Database';

// Extract values from the environment or use default values
const port = process.env.SERVER_PORT || defaultPort;
const mongoURI = process.env.MONGODB_URI || defaultMongoURI;

// Check if .env file exists
const envFilePath = path.join(__dirname, '.env');
const isEnvFileUsed = fs.existsSync(envFilePath);

if (isEnvFileUsed) {
    console.log('Environment file found, Using environment variables from .env file.');
} else {
    console.log(`Environment file not found not found. Using default settings.`);
    console.log(`Create .env file to Use Custom environment variables.`);
    console.log(`Create .env file to Use Custom environment variables.`);
    console.log(`Example variables you can set in .env:`);
    console.log(`SERVER_PORT: Custom port for the server (default: ${defaultPort})`);
    console.log(`MONGODB_URI: Custom MongoDB connection string (default: ${defaultMongoURI})`);
}

// Check individual environment variables
if (process.env.SERVER_PORT) {
    console.log(`Using SERVER_PORT from .env: ${process.env.SERVER_PORT}`);
} else {
    console.log(`SERVER_PORT not provided in .env. Using default: ${defaultPort}`);
}

if (process.env.MONGODB_URI) {
    console.log(`Using MONGODB_URI from .env: ${process.env.MONGODB_URI}`);
} else {
    console.log(`MONGODB_URI not provided in .env. Using default: ${defaultMongoURI}`);
}

const app = express(); // Initialize Express

async function initializeApp() {
    try {
        // Print MongoDB URI that the server is attempting to connect to
        console.log(`Attempting to connect to MongoDB at: ${mongoURI}`);

        // Connect to MongoDB using async-await
        await mongoose.connect(mongoURI);
        console.log(`MongoDB successfully connected at: ${mongoURI}`);
    } catch (err) {
        console.error('Fail to Connect to Database');
        console.error(err);// Log detailed error message
        console.error("Application Closed");
        process.exit(1); // Exit the process if connection fails
    }
}

initializeApp()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
        });
    });