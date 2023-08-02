FROM node:alpine3.18
WORKDIR /app
COPY package.json .
RUN npm i -g pnpm
RUN pnpm install
COPY . .
RUN pnpm prisma generate
CMD ["pnpm", "start"]
