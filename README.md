# TaskChain

## Overview
A cutting-edge decentralized web application that empowers users to create and manage tasks seamlessly using wallet-based authentication. Users can effortlessly sign in with their crypto wallets, create tasks, collect votes, and manage responses—all while ensuring data security and integrity.

## Features
- **Web3 Authentication**: 
  - Sign in with your crypto wallet.
  - Automatic user creation on first login.
  - Secure signature verification.

- **Task Management**: 
  - Create tasks with multiple image options.
  - View task statistics and submissions.
  - Track submission counts per option.
  - Secure transaction handling.

- **Image Handling**: 
  - Cloudinary integration for efficient image management.
  - Presigned upload URLs for secure uploads.
  - Support for multiple image formats.

- **Data Security**: 
  - MongoDB transactions for reliable data handling.
  - Input validation using Zod for data integrity.
  - Middleware authentication and robust error handling.

## Technical Stack
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose ODM
- **Storage**: Cloudinary
- **Validation**: Zod
- **Authentication**: Web3/Ethereum wallets

## Web3 Integration
This application utilizes Web3 technology to enable users to authenticate using their cryptocurrency wallets. The integration allows for secure and decentralized user management, ensuring that users have full control over their data and interactions within the application.

## API Endpoints
### Authentication
- **POST** `/api/users/signin`: Wallet-based authentication.

### Tasks
- **POST** `/api/users/create-task`: Create a new task with options.
- **GET** `/api/users/tasks`: Retrieve task details with submission stats.
- **POST** `/api/users/submit`: Submit a response for a task.

### Images
- **POST** `/api/users/upload`: Get a presigned Cloudinary upload URL.

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/jfernsio/decentralized.git
   cd decentralized
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Create a `.env` file in the root directory and add your MongoDB URI, Cloudinary credentials, and Web3 keys.
   ```plaintext
   # Required Environment Variables
   MONGODB_URI=mongodb://localhost:27017/taskdb
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   PRIVATE_KEY=your_private_key
   RPC_URL=https://your_rpc_url
   PUBLIC_KEY=your_public_key
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - The server will run on `http://localhost:3000`.

## License
This project is licensed under the MIT License.
