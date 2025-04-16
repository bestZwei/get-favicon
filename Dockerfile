# Use official Node.js image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production
COPY . .

EXPOSE 9738
CMD ["node", "server.js"]
