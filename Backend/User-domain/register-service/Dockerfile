FROM node:18-slim

WORKDIR /app

RUN apt-get update && apt-get install -y libssl1.1

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "src/index.js"]
