FROM node:18-alpine

WORKDIR /app

# Instalar openssl 1.1 y dependencias necesarias para Prisma
RUN apk add --no-cache openssl1.1-compat

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "src/index.js"]
