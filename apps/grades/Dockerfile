FROM node

WORKDIR /usr/src/app

COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY package*.json .

RUN yarn install

COPY libs libs

COPY apps/grades apps/grades

RUN cd libs/common/src && npx prisma generate
