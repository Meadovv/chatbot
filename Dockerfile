FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm i npm@latest -g

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]