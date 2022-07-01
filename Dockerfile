FROM node:7.7.2

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install && npm run build

EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/npm", "run", "serve"]
