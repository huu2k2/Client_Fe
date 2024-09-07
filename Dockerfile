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

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và yarn.lock vào container
COPY package.json yarn.lock ./

# Cài đặt các dependencies
RUN yarn install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng mặc định của Vite (3000)
EXPOSE 3000

# Lệnh để chạy ứng dụng Vite trong môi trường development
CMD ["yarn", "dev", "--host"]
