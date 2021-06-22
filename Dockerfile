FROM node:15.12.0

EXPOSE 4000
ARG database_url
ENV DATABASE_URL=$database_url

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --production
RUN npm i -g prisma
COPY . .
RUN prisma generate
CMD [ "node", "index.js" ]
