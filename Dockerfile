FROM node:18.16-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:18.16.0-alpine AS develop

WORKDIR /app

COPY --from=build /app ./

CMD ["npm", "run", "start:dev"]
