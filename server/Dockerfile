FROM node:14.4.0-alpine

WORKDIR /app

COPY ./package.json .

RUN yarn install

COPY . .

CMD [ "yarn","start" ]
