FROM node:16-alpine as node 

RUN  apk update && apk add busybox-extras 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

EXPOSE ${APP_PORT}

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]