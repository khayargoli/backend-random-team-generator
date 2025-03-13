# Node.js + Express + MongoDB Backend API

This repository contains the backend API for random-team-generator. It's built using Node.js, Express.js for the server framework, and MongoDB for the database.

## Technologies Used

* **Node.js:** JavaScript runtime environment.
* **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB:** NoSQL document database.
* **Mongoose:** MongoDB object modeling tool designed to work in an asynchronous environment.

## Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js:** (Recommended version: LTS) - [Download Node.js](https://nodejs.org/)
* **npm or yarn:** (npm is included with Node.js)
* **MongoDB:** (Install and run MongoDB locally or use a cloud service like MongoDB Atlas) - [Download MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/khayargoli/backend-random-team-generator.git
    cd backend-random-team-generator
    ```

2.  **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```
    
## Environment Variables

This project uses environment variables to configure sensitive or environment-specific settings.

1.  **Create `.env` file:**

    In the root directory of your project, create a file named `.env`. This file will store your environment variables.

2.  **Add your variables:**

    Add your environment variables in the following format:

    ```
    PORT=5000
    MONGO_URI=mongodb+srv://rootuser:demopassword-1@cluster0.ixqso.mongodb.net/team_generator_db?retryWrites=true&w=majority&appName=Cluster0
    ```


## Running the Project Locally


1.  **Start the development server:**

    Using:

    ```bash
    node server.js
    ```

2.  **Access the API:**

    The API will be accessible at `http://localhost:[PORT]` (e.g., `http://localhost:5000`).
