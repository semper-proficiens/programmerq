# Use the Node.js base image
FROM node:16.13.2-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json to /app
COPY package.json /app/package.json

# Install dependencies
RUN npm install

# Copy the public directory to /app/public
COPY public /app/public

# Copy the contents of the src directory to /app/src
COPY ./src /app/src

# Start the app when the container starts
CMD ["npm", "start"]
