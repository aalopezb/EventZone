FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "src/index.js"]
