FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json, yarn.lock (if exists), and other necessary files
COPY package.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the application code
COPY . .

# Build your application (if necessary)
RUN npm run build
# Expose port app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start"]


