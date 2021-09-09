FROM node:14
LABEL maintainer="leonardo_scalabrini@hotmail.com"
ENV PORT=9090
ENV STRING_CONNECTION_DB="ARG_STRING_CONNECTION_DB"
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE $PORT
ENTRYPOINT [ "npm", "start" ]