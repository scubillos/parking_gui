# Imagen de NodeJS
FROM node:14-alpine

# Establecer directorio de trabajo
WORKDIR /var/www/html/app

COPY parking_gui .