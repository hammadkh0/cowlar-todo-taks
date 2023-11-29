FROM node:19-buster-slim

LABEL version="1.0"
LABEL description="This is the backend for the TODO app"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV DATABASE_URL=mongodb://mongo:27017/todo-project
ENV JWT_SECRET=never_gonna_give_you_up
ENV JWT_EXPIRES_IN=86400
EXPOSE 5000
CMD [ "npm", "start" ]