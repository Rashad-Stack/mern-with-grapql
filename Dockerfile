ARG NODE_VERSION=21.1.0
FROM node:${NODE_VERSION}-alpine
WORKDIR  /app
COPY package*.json ./
# RUN --mount=type=cache,target=/app/.npm \
#   npm set cache /app/.npm && \
#   npm ci

RUN npm install

COPY . .
EXPOSE 3000
CMD npm run dev