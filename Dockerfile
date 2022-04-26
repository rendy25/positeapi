FROM node:14-alpine
LABEL maintainer "lanchen <rendydwi38@gmail.com>"
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
