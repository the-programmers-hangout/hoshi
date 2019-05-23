FROM node:10

COPY package*.json ./
RUN npm install --only=prod

COPY . .

CMD node .