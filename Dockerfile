# Stage 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY ./ /app
RUN npm run build --prod

# Stage 2: Serve the Angular app
FROM nginx:stable
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/clink-web/browser /usr/share/nginx/html
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]