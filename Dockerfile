
FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .

RUN npm install

ENTRYPOINT [ "node", "app.js" ]