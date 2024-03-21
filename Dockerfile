# Use the official Node.js 14 image as a base
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 (the default port for NestJS applications)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
