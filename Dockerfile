FROM node:alpine3.19

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN cd ./client && npm ci  && npm run build && cd ..

RUN npm install

RUN mkdir -p /usr/src/app/public

RUN cp -r ./client/build/* ./public/

WORKDIR  /usr/src/app/

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]