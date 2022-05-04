FROM node:current-alpine AS build-stage

WORKDIR /tmp

COPY . .

RUN yarn && yarn build


FROM nginx:alpine AS run-stage

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /tmp/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /tmp/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
