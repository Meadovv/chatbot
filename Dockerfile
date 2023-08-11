FROM node:18-alpine

WORKDIR /usr/backend

COPY package*.json ./

RUN npm i npm@latest -g

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build-src

CMD [ "npm", "run", "build" ]