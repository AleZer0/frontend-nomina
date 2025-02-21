# Etapa 1: Construcción de la aplicación React con Vite
FROM node:18 AS builder

WORKDIR /app

# Copiar archivos necesarios y ejecutar instalación
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código y construir la aplicación
COPY . .
RUN npm run build

# Etapa 2: Servir la aplicación con Apache
FROM httpd:latest

# Instalar módulos necesarios para Apache, incluyendo SSL
RUN apt-get update && apt-get install -y \
    apache2-utils \
    openssl \
    && apt-get clean

# Habilitar módulos necesarios de Apache
RUN sed -i '/LoadModule ssl_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/LoadModule socache_shmcb_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Copiar archivos de configuración
COPY apache-config.conf /usr/local/apache2/conf/httpd.conf

# Crear carpeta para los certificados SSL si no existe
RUN mkdir -p /usr/local/apache2/conf/ssl

# Copiar certificados SSL al contenedor
COPY certs/_.xrom.cc.crt /usr/local/apache2/conf/ssl/
COPY certs/_.xrom.cc.key /usr/local/apache2/conf/ssl/

# Copiar los archivos de la aplicación de Vite a Apache
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

# Exponer puertos
EXPOSE 80 443

# Ejecutar Apache en primer plano
CMD ["httpd", "-D", "FOREGROUND"]
