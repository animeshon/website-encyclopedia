FROM node:13-alpine AS dependencies

WORKDIR /build

COPY package*.json ./

RUN npm install --production

# ----------------------------------------------------------------
FROM node:13-alpine AS builder

WORKDIR /build

COPY --from=dependencies /build /build
COPY . .

# ! TODO: Figure out which ones are required at build-time and which ones at runtime.
# ! TODO: Pass the variables as build args coming from the CI instead of hardcoding them.
ENV GRAPHQL_ENDPOINT    "https://api.animeshon.com/graphql"
ENV NEXTJS_ASSET_PREFIX "/e"
ENV NEXTJS_BASEPATH     "/e"
ENV HOST                "animeshon.com"
ENV WEBSITE_NAME        "Animeshon Encyclopedia"
ENV WEBSITE_BASEURL     "https://animeshon.com/e"
ENV GTM_TRACKING_ID     "GTM-NRN5LVP"
ENV NODE_ENV            "production"

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
