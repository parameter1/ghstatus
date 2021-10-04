FROM node:14.16-alpine as build-app
WORKDIR /app
ADD package.json yarn.lock /app/
ADD app /app/app
RUN yarn --pure-lockfile
WORKDIR /app/app
ENV VUE_APP_FRONTEND_URL https://ghstatus.parameter1.com
ENV VUE_APP_BACKEND_URL https://ghstatus.parameter1.com
RUN yarn build

FROM nginx:alpine
COPY app/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-app /app/app/dist/ /usr/share/nginx/html
