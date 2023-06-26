FROM node:19-buster-slim

LABEL version="1.0"
LABEL description="This is the frontend for the TODO app."

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=5173
ENV VITE_USER_SERVICE_URL=http://localhost:5000
ENV VITE_TODO_SERVICE_URL=http://localhost:5001
EXPOSE 5173
CMD [ "npm", "run", "dev" ]