FROM node:16.4.2-alpine
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
EXPOSE 3000
CMD ["node", "src/server/index.js"]