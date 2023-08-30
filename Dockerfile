FROM node:16-alpine

WORKDIR .

COPY package.json  ./

RUN apk add --no-cache git \
    && npm install  \

COPY . .
RUN npm run build

EXPOSE 4200

CMD ["npm", "start"]