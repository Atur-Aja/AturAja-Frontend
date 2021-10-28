#REACT SECTION
FROM node:12-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

#NGINX SECTION
FROM nginx:1.20.1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]