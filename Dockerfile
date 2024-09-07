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
# Sử dụng image Node.js chính thức


# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và yarn.lock vào container
COPY package.json yarn.lock ./

# Cài đặt các dependencies
RUN yarn install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng cho môi trường sản phẩm
RUN yarn build

# Giai đoạn chạy
FROM node:20.12.2-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép các file build từ giai đoạn build vào thư mục làm việc
COPY --from=build /app/dist /app/dist

# Cài đặt serve để phục vụ các file tĩnh
RUN yarn global add serve

# Mở cổng mặc định của serve (5000)
EXPOSE 5000

# Lệnh để chạy serve
CMD ["serve", "-s", "dist", "-l", "5000"]


