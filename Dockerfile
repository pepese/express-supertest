FROM node:12.8.1-alpine

ARG APP_VERSION
ENV APP_NAME express-supertest
ENV TZ Asia/Tokyo
ENV APP_VERSION ${APP_VERSION}

RUN apk add --no-cache tzdata
RUN mkdir -p /usr/${APP_NAME}
COPY ./app /usr/${APP_NAME}/app
COPY ./package.json /usr/${APP_NAME}/package.json
COPY ./package-lock.json /usr/${APP_NAME}/package-lock.json

WORKDIR /usr/${APP_NAME}
RUN npm install

CMD ["node","app/app.js"]
