FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Serve build folder with a simple server
RUN npm install -g serve

EXPOSE 3001
CMD ["serve", "-s", "build"]
