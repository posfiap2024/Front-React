FROM node:lts

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /home/node/app

ENV PORT $PORT
EXPOSE $PORT

COPY package*.json /home/node/app/
RUN npm ci

COPY . /home/node/app/

CMD ["npm", "run", "start:dev"]
