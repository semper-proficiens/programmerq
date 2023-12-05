# Use the Node.js base image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the public directory to /app/public
COPY public /app/public

# Copy the contents of the src directory to /app/src
COPY ./src /app/src

# Start the app when the container starts
CMD ["npm", "start"]
