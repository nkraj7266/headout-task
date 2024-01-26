# Use a Node.js base image that supports both ARM and x86 architectures
FROM node:16-slim

# Create a directory for the app
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the server code
COPY . /app

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["node", "index.js"]
