FROM node:14-alpine
LABEL maintainer "azam hizbul <azamhizbul@gmail.com>"
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
