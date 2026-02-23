# Backend API only (no frontend)
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
COPY migrations ./migrations
RUN npx tsc
EXPOSE 3000
CMD ["node", "dist/index.js"]
