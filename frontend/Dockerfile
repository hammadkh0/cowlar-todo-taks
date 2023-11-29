FROM node:19-buster-slim

LABEL version="1.0"
LABEL description="This is the frontend for the TODO app."

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=5173
ENV VITE_BACKEND_URL=http://localhost:5000
EXPOSE 5173
CMD [ "npm", "run", "dev" ]