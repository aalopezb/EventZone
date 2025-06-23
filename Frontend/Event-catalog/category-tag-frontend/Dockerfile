
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build


FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html


EXPOSE 3023

CMD ["nginx", "-g", "daemon off;"]
