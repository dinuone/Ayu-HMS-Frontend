# Define build arguments for environment variables
ARG NODE_VERSION=22.14.0

# First stage: Build the application
FROM node:${NODE_VERSION}-alpine AS build

# Set working directory for all build stages.
WORKDIR /src

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci


# Copy the rest of the source files into the image.
COPY . .

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL $VITE_API_BASE_URL

# Run the build script.
RUN npm run build

# Create a new stage for the production image
FROM nginx:alpine

# Copy the build output from the build stage
COPY --from=build /src/dist /usr/share/nginx/html
COPY nginx.conf  /etc/nginx/conf.d/default.conf
# Expose the port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
