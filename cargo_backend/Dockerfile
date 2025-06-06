# ---------- Base --------------
FROM node:18-alpine as base
WORKDIR /app



# ---------- Builder --------------
FROM base as builder

COPY package.json tsconfig.json ./
COPY ./src ./src

RUN npm install 
RUN npm run build --production

# remove dev dependencies
RUN npm prune --production

#RUN /usr/local/bin/node-prune


# ---------- Release  --------------
FROM base as release

RUN apk add --no-cache tzdata \
    && addgroup --gid 1024 mygroup \
    && adduser node mygroup

ENV TZ=Asia/Ulaanbaatar


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY package.json ./

# --- .env should be mounted to /app/.env
USER node

EXPOSE 3001
CMD [ "node", "./build/index.js"]
