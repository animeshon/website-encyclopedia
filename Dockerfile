FROM node:13-alpine AS dependencies

WORKDIR /build

COPY package*.json ./

RUN npm install --production

# ----------------------------------------------------------------
FROM node:13-alpine AS builder

WORKDIR /build

COPY --from=dependencies /build /build
COPY . .

ENV GRAPHQL_ENDPOINT "https://api.animeshon.com/graphql"
ENV NEXTJS_BASEPATH "/e"

RUN npm run build-fragment
RUN npm run build

# ----------------------------------------------------------------
FROM node:13-alpine

WORKDIR /app

COPY package*.json ./

COPY --from=dependencies /build ./

COPY --from=builder /build/.next .next
COPY --from=builder /build/public public
COPY --from=builder /build/next.config.js next.config.js

RUN mkdir pages

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
USER node

CMD [ "npm", "run", "start:production" ]
