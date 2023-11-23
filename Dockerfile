FROM node:14-alpine as build
WORKDIR /app
RUN apk add --no-cache tzdata
ENV TZ=America/Sao_Paulo

RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx as runtime
COPY --from=build /app/dist/mclaren /usr/share/nginx/html
