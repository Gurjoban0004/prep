FROM node:20-slim

# Install OpenJDK 17 for Java compilation and runtime
RUN apt-get update && apt-get install -y openjdk-17-jdk-headless && rm -rf /var/lib/apt/lists/*

# Set up app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy application source
COPY . .

# Expose the API port
EXPOSE 5005

# Run the judge service
CMD [ "npm", "start" ]
