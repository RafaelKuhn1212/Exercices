FROM node:alpine3.18
WORKDIR /app
COPY package.json .
RUN npm i -g pnpm
RUN pnpm install
COPY . .
ENV DATABASE_URL="postgres://trilogic2:Tril29%23logic@trilogic2.postgresql.dbaas.com.br:5432/trilogic2"
RUN pnpm prisma db push --accept-data-loss
RUN pnpm prisma generate
CMD ["pnpm", "start"]
