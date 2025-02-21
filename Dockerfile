# Etapa 1: Construcción de la aplicación Vite (React)
FROM node:18 AS builder

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos del proyecto
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación con Vite
RUN npm run build

# Etapa 2: Servir la aplicación con Apache y SSL
FROM httpd:latest

# Instalar curl para pruebas dentro del contenedor
RUN apt-get update && apt-get install -y curl

# Copiar los archivos de configuración de Apache
COPY apache-config.conf /usr/local/apache2/conf/httpd.conf

# Copiar los certificados SSL
COPY ./certs/_.xrom.cc.crt /usr/local/apache2/conf/ssl/_.xrom.cc.crt
COPY ./certs/_.xrom.cc.key /usr/local/apache2/conf/ssl/_.xrom.cc.key

# Copiar los archivos generados por Vite en la etapa anterior
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

# Exponer puertos HTTP y HTTPS
EXPOSE 80 443

# Iniciar Apache en primer plano
CMD ["httpd", "-D", "FOREGROUND"]
