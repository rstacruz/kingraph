FROM node:7-alpine

RUN apk add --no-cache git
RUN npm install -g rstacruz/kingraph
ENTRYPOINT ["kingraph"]
CMD ["--help"]
VOLUME /data
WORKDIR /data
