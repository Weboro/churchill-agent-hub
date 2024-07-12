FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json, yarn.lock (if exists), and other necessary files
COPY package.json yarn.lock* ./

# Install Yarn globally

# Install dependencies using Yarn


# Copy the rest of the application code
COPY . .
RUN yarn install
# Build your application (if necessary)
RUN yarn build

# Expose port app runs on
EXPOSE 3000

# Command to run the app
CMD ["yarn", "start"]


