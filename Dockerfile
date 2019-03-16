FROM node:9

RUN apt-get update && apt-get install stress-ng

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
