# # Use an official Node.js runtime as a parent image
# FROM node:20.12.2 as build

# # Set the working directory in the container
# WORKDIR /app

# # Copy the package.json and yarn.lock files to the working directory
# COPY package.json yarn.lock ./

# # Install the project dependencies using Yarn
# RUN yarn install

# # Copy the rest of the application code to the working directory
# COPY . .

# # Build the React application
# RUN yarn build

# # Use an official Nginx runtime as a parent image
# FROM nginx:alpine

# # Copy the built React application from the build stage
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy the custom Nginx configuration file to the container
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80 to the outside world
# EXPOSE 82

# # Command to run the Nginx server
# CMD ["nginx", "-g", "daemon off;"]

# Use the official Node.js image as the base image
FROM node:20.12.2 as build

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock /app/

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . /app

# Expose the port the app runs on
EXPOSE 9000

# Command to start the app
CMD ["yarn", "dev"]
