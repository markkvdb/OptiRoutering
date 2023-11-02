# Build stage
FROM node:18-alpine AS builder

# Set up work directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install packages
RUN npm ci

# Copy project and build
COPY . ./
RUN mkdir ./data
RUN npm run build
RUN npm prune --omit=dev

# Run stage
FROM node:18-alpine

# Set work directory
WORKDIR /app

# Copy build environment
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/

# Copy migration files and create data folder
COPY --from=builder /app/drizzle drizzle/
RUN mkdir ./data

COPY package.json ./

EXPOSE 3000

CMD [ "node", "build" ]
