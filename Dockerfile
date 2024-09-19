FROM node:20-alpine3.18

RUN apk add --no-cache bash curl

WORKDIR /app

COPY package*.json .
RUN npm ci --production
COPY . .

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

EXPOSE 3030

CMD ["wait-for-it.sh", "neo4j:7687", "--", "npm", "start"]
