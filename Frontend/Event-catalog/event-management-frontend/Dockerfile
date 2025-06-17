# Etapa 1: build de la app
FROM node:18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: nginx para servir frontend
FROM nginx:alpine

# Copia la build de React
COPY --from=builder /app/build /usr/share/nginx/html

# Borra la configuración default y reemplaza por la nuestra
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 3021
CMD ["nginx", "-g", "daemon off;"]
