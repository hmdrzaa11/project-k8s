FROM node:16-alpine as builder

WORKDIR /app

COPY ./package.json .

RUN yarn install

COPY . .

RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/builder /usr/share/nginx/html

