#Stage 1 Build process
FROM node:alpine as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 Production
FROM yobasystems/alpine-nginx:arm32v7
COPY --from=build-deps /usr/src/app/build /etc/nginx/html
EXPOSE 8
CMD ["nginx"]
