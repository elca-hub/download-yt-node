FROM node:12-slim

COPY package*.json ./

RUN npm install

COPY . .


CMD ["node", "./server.js"]