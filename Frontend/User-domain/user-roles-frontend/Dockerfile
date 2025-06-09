FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 3007

ENV HOST=0.0.0.0

CMD ["npm", "start"]
