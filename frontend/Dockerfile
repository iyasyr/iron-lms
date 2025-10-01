# ---- build stage ----
FROM node:20 AS build
WORKDIR /app
COPY frontend/package.json frontend/yarn.lock ./
ENV YARN_CACHE_FOLDER=/tmp/.yarn-cache
RUN yarn install --frozen-lockfile
COPY frontend/. ./
# base URL API for build step
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN yarn build

# ---- serve stage ----
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# SPA fallback: ensure directory exists before writing
RUN mkdir -p /etc/nginx/snippets && printf "try_files \$uri /index.html;\n" > /etc/nginx/snippets/spa.conf
COPY ops/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80