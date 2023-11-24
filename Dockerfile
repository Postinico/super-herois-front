FROM node:16-alpine as build
WORKDIR /app
RUN apk add --no-cache tzdata
ENV TZ=America/Sao_Paulo

RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

FROM nginx as runtime
COPY --from=build /app/dist/front /usr/share/nginx/html
