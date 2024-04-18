FROM node

WORKDIR /usr/src/app

COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY package*.json .

RUN yarn install

COPY libs libs

COPY apps/pdp apps/pdp

CMD sh -c "cd libs/common/src && npx prisma migrate deploy && yarn start:dev"
