# Use the official Node.js image (or bun image if needed)
FROM node:16-slim

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the backend directory to /app/backend
COPY backend /app/backend

# Install dependencies using npm 
RUN cd /app/backend && npm install

# Expose the port your backend is running
EXPOSE 8000

# Set the command to run your application 
 CMD ["npm", "start"] 
