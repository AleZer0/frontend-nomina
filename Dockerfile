# Etapa de construcción
FROM node:22-alpine AS builder
WORKDIR /app

# Copiamos archivos de configuración e instalamos dependencias
COPY package*.json ./
RUN npm ci  # Más seguro y rápido que "npm install"

# Copiamos el resto del código y construimos la aplicación
COPY . .
RUN npm run build

# Etapa de producción con Apache y SSL
FROM httpd:2.4-alpine

# Elimina el contenido por defecto de Apache
RUN rm -rf /usr/local/apache2/htdocs/*

# Copia los archivos compilados de la aplicación
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

# Habilita módulos necesarios de Apache
RUN sed -i 's/^#LoadModule ssl_module/LoadModule ssl_module/' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's/^#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's/^#LoadModule socache_shmcb_module/LoadModule socache_shmcb_module/' /usr/local/apache2/conf/httpd.conf

# Copia certificados SSL (asegúrate de que existan en la carpeta)
COPY ./certs/_.xrom.cc.crt /usr/local/apache2/conf/ssl/_.xrom.cc.crt
COPY ./certs/_.xrom.cc.key /usr/local/apache2/conf/ssl/_.xrom.cc.key

# Ajusta los permisos de los certificados
RUN chmod 644 /usr/local/apache2/conf/ssl/_.xrom.cc.crt
RUN chmod 600 /usr/local/apache2/conf/ssl/_.xrom.cc.key

# Copia la configuración SSL de Apache
COPY conf/httpd-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf

# Incluye la configuración SSL en Apache
RUN echo "Include conf/extra/httpd-ssl.conf" >> /usr/local/apache2/conf/httpd.conf

# Verifica la configuración de Apache
RUN httpd -t

# Expone los puertos HTTP y HTTPS
EXPOSE 80 443

# Inicia Apache en primer plano
CMD ["httpd-foreground"]
