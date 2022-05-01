FROM node:16.15-alpine3.14 as builder

WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.13.7-alpine

RUN apk update && apk add vim

ARG REST_API_URL_PRODUCTION
ARG REST_API_PORT_PRODUCTION
ARG ADMIN_URL_PRODUCTION
ARG ADMIN_PORT_PRODUCTION

RUN rm /usr/share/nginx/html/*

COPY default.conf /etc/nginx/conf.d/

RUN sed -i "s/REST_API_URL_PRODUCTION/$REST_API_URL_PRODUCTION/g" /etc/nginx/conf.d/default.conf
RUN sed -i "s/REST_API_PORT_PRODUCTION/$REST_API_PORT_PRODUCTION/g" /etc/nginx/conf.d/default.conf

RUN sed -i "s/ADMIN_URL_PRODUCTION/$ADMIN_URL_PRODUCTION/g" /etc/nginx/conf.d/default.conf
RUN sed -i "s/ADMIN_PORT_PRODUCTION/$ADMIN_PORT_PRODUCTION/g" /etc/nginx/conf.d/default.conf

RUN cat /etc/nginx/conf.d/default.conf

COPY --from=builder /app/public/. /usr/share/nginx/html/
COPY --from=builder /app/dist/. /usr/share/nginx/html/

EXPOSE 80
