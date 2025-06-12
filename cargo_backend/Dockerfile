### BUild
FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn global add rimraf @nestjs/cli

RUN yarn

COPY . .

# -------Builder-----
RUN npm run build


# re        ove dev dependencies
RUN npm prune --production

### deploy
FROM node:20-alpine AS deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json /usr/src/app/
COPY --from=build /usr/src/app/yarn.lock /usr/src/app/
COPY --from=build /usr/src/app/dist/ /usr/src/app/dist/
COPY --from=build /usr/src/app/node_modules/ /usr/src/app/node_modules/


CMD [ "node", "dist/main" ]
