FROM node:bullseye-slim
LABEL maintainer="leonardo_scalabrini@hotmail.com"
RUN apt-get update -y && apt-get upgrade -y
RUN useradd -ms /bin/bash cep-backend
USER cep-backend
ENV PORT=9090
ENV STRING_CONNECTION_DB="ARG_STRING_CONNECTION_DB"
WORKDIR /app
COPY . .
EXPOSE $PORT
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl -f http://localhost/ || exit 1" ]
ENTRYPOINT [ "npm", "start" ]