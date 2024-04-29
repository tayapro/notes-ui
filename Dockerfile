# Use an node image from DockerHub as a parent image
FROM node:21.6.1-slim

# Set the working directory
WORKDIR /app

# Copy required files to the image
COPY public/ ./public
COPY src/ ./src
COPY index.html .
COPY npx-server.sh .
COPY package-lock.json .
COPY package.json .
COPY vite.config.js .

RUN npm install

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run npm start command when the container launches
CMD ["sh", "start-server.sh"]