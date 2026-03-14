FROM node:20-alpine AS base
WORKDIR /app

COPY package.json ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json

RUN npm install && \
    cd client && npm install && \
    cd ../server && npm install

COPY . .

FROM base AS client-build
WORKDIR /app/client
RUN npm run build

FROM base AS production
WORKDIR /app

COPY --from=client-build /app/client/dist ./client/dist

ENV NODE_ENV=production
EXPOSE 4000

CMD ["npm", "run", "start"]

