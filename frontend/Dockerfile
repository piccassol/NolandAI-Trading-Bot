# Use the official Node.js image from the Docker Hub
FROM node:16-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json /app/

# Install the dependencies
RUN npm install

# Copy the entire frontend directory into the container
COPY . /app/

# Build the React application
RUN npm run build

# Install Nginx to serve the React app
RUN apt-get update && apt-get install -y nginx && apt-get clean

# Copy the build output to Nginx's public directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
