# Use the Node.js base image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the contents of the build directory to /app/build
COPY ./build /app/build

# Start the app when the container starts
CMD ["npm", "start"]
