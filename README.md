# Mongoose Express A2 CRUD Mastery

## Project Overview

This project is a Node.js Express application written in TypeScript that integrates MongoDB with Mongoose for user data and order management. The application provides CRUD (Create, Read, Update, Delete) operations for user management and includes a bonus section for order management.

## Setup

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running
- Yarn installed on your machine

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/getMonirr/crud-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd crud-app
   ```

3. **Install dependencies:**

   ```bash
   yarn install
   ```

4. **Create a .env file in the root directory and add the following:**

   ```bash
   MONGODB_URI=<your-mongodb-uri>
   PORT=3000
   ```

   Replace "your-mongodb-uri" with the connection URI for your MongoDB instance.

### Running the Application

1. **Build the TypeScript code:**

   ```bash
   yarn build
   ```

2. **Start the server:**

   ```bash
   yarn dev
   ```

   The application will be running at http://localhost:5000.
