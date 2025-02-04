# Project Title

## Overview
This project is a web application that provides a backend API for managing users and tasks. It allows users to sign in using their wallet addresses, create and manage tasks, and upload images to Cloudinary.
# Decentralized Task Management System

## Overview
A decentralized web application enabling users to create tasks with multiple options, collect votes/submissions, and manage responses using wallet-based authentication.

## Features
- **Web3 Authentication**
  - Sign in with crypto wallet
  - Automatic user creation on first login
  - Signature verification

- **Task Management**
  - Create tasks with multiple image options 
  - View task statistics and submissions
  - Track submission counts per option
  - Secure transaction handling

- **Image Handling**
  - Cloudinary integration
  - Presigned upload URLs
  - Secure image storage
  - Support for multiple image formats

- **Data Security**
  - MongoDB transactions
  - Input validation using Zod
  - Middleware authentication
  - Error handling

## Technical Stack
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose ODM
- **Storage**: Cloudinary
- **Validation**: Zod
- **Authentication**: Web3/Ethereum wallets

## API Endpoints

### Authentication
- POST `/api/users/signin` - Wallet-based authentication

### Tasks
- POST `/api/users/create-task` - Create new task with options
- GET `/api/users/tasks` - Get task details with submission stats
- POST `/api/users/submit` - Submit response for a task

### Images
- POST `/api/users/upload` - Get presigned Cloudinary upload URL

## Setup
```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start development server
npm run dev
## Features
- **User Authentication**: Users can sign in with their wallet addresses. If a user does not exist, they are automatically created in the database.
- **Task Management**: Users can create tasks with associated options and retrieve task details.
- **Image Uploads**: Users can upload images to Cloudinary, with presigned URLs generated for secure uploads.
- **Data Validation**: The application uses Zod for validating task creation data to ensure data integrity.

## Technologies Used
- **Node.js**: The backend is built using Node.js and Express.
- **MongoDB**: User and task data are stored in a MongoDB database.
- **Cloudinary**: Used for image storage and management.
- **Zod**: For data validation.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <https://github.com/jfernsio/decentralized.git>
   cd <backend>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add your MongoDB URI and Cloudinary credentials.
    # Required Environment Variables
MONGODB_URI=mongodb://localhost:27017/taskdb
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret

4. Start the server:
   ```bash
   npm start
   ```

5. The server will run on `http://localhost:3000`.

## API Endpoints
- **POST /api/user/sigin**: Sign in a user.
- **GET /api/user/presigned**: Get a presigned URL for image uploads.
- **GET /api/user/tasks**: Retrieve tasks for the authenticated user.
- **POST /api/user/tasks**: Create a new task.

## License
This project is licensed under the MIT License.
