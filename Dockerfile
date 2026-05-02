FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Install a simple static file server
RUN npm install -g serve

# Serve the application on the port specified by Cloud Run
CMD serve -s dist -l tcp://0.0.0.0:$PORT
