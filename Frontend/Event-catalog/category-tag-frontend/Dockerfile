# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Production stage
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Copia configuración personalizada de nginx si usas proxy (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3023

CMD ["nginx", "-g", "daemon off;"]
