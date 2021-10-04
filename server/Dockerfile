FROM node:14.16-alpine as build-server
WORKDIR /app
ENV NODE_ENV production
ADD package.json yarn.lock /app/
ADD server /app/server
RUN yarn --production --pure-lockfile
WORKDIR /app/server

FROM node:14.16-alpine
ENV NODE_ENV production
ENV PORT 80
COPY --from=build-server /app /app
WORKDIR /app/server
ENTRYPOINT [ "yarn", "start" ]
