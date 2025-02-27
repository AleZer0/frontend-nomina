# 1. Construcción de la aplicación en una imagen de Node.js
FROM node:20-alpine AS build

WORKDIR /app

# Copiar archivos y dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código y compilar la aplicación
COPY . .
RUN npm run build

# 2. Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar la configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos compilados de React
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar certificados SSL
COPY certs/_.xrom.cc.crt /etc/nginx/ssl/_.xrom.cc.crt
COPY certs/_.xrom.cc.key /etc/nginx/ssl/_.xrom.cc.key

# Exponer solo el puerto 443 (HTTPS)
EXPOSE 443

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
