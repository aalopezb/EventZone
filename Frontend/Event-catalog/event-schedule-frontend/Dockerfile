FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY ./public ./public
COPY ./src ./src

ENV PORT=3027

CMD ["npm", "start"]
