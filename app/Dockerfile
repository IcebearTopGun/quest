FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x bin/001 bin/*


EXPOSE 3000

CMD ["npm", "start"]
