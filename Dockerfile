FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN cd ./client && npm ci  && npm run build && cd ..

RUN npm ci

RUN mkdir -p /usr/src/app/public

RUN cp -r ./client/build/* ./public/

WORKDIR  /usr/src/app/

RUN npm run build

EXPOSE 5000

CMD [ "npm", "run", "start:dev" ]