FROM node:13-alpine AS dependencies

WORKDIR /build

COPY package*.json ./

RUN npm install --production

# ----------------------------------------------------------------
FROM node:13-alpine

WORKDIR /app

RUN npm install --global pm2

COPY --from=dependencies /build /app
COPY . .

RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]
