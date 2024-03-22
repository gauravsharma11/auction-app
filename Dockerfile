FROM node:21
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN cd ./client && npm ci  && npm run build && cd ..

RUN cd ./ && npm ci  && cd ..

RUN mkdir -p /usr/src/app/dist

RUN cp -r ./client/build/* ./dist/

WORKDIR  /usr/src/app/

RUN npm run build

EXPOSE 5000

CMD [ "npm", "run", "start:dev" ]