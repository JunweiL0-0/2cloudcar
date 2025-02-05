## 2CloudCar

## Description

NodeJs Backend + Vite React Frontend + MongoDB
## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Documentation](#api-documentation)

## Installation

1. Clone the repository:
    ```bash
    git clone 
    ```

2. Install dependencies:
    ```bash
    cd carBack/
    npm install
    cd ..
    cd carFront/car-front/
    npm install
    ```

## Configuration

- Upload "assests/Australian Vehicle Prices.csv" to your mongoDB
- Modify the server and MongoDB port inside carBack/server.js

## Project Structure
- `carBack/app/`: Backend source code.
    - `controllers/`: Contains logic for handling incoming requests and sending responses.
    - `middlewares/`: Custom middleware for request processing, such as authentication or error handling.
    - `models/`: Defines data models and structures, typically connected to the database.
    - `mongoSchema/`: MongoDB schema definitions and models.
    - `routes/`: Defines the routes/endpoints for the application and connects them to controllers.
- `config/`: Express Configuration files.

- `carFront/car-front/src/`: Backend source code.
    - `components/`: React components to be added to the web page.


## Usage

1. To run the application locally:
    ```bash
    Open your terminal
    Start your mongoDB
    Open a new terminal
    cd carBack
    npm start
    Open a new terminal
    cd carFront/car-front
    npm run dev
    ```

2. Open your browser and navigate to the url displayed on your terminal

