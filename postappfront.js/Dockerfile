FROM node:lts


ENV CI=true
ENV PORT=3000

WORKDIR /home/node/app

COPY package*.json /home/node/app/

RUN npm ci

COPY . /home/node/app/

RUN npm run build

CMD ["npm", "start", "dev"]
