# Parking GUI

Proyecto frontend para aplicación de reserva de parqueaderos. Para ambiente de desarrollo se dispone de virtualización con Docker, y además se encuentra preparado para despiegue en pods de Kubernetes.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- Docker
- Docker Compose
  - Node.js 14
  - NPM (Instalado dentro del contenedor)

## Configuración del entorno

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

1. Clona este repositorio:
2. Navega al directorio del proyecto:
  ```bash
  cd tu-proyecto
  ```

3. Copia el archivo de configuración de ejemplo y renómbralo:

  ```bash
  cp .env.example .env
  ```
 
4.Abre el archivo .env y configúralo según tus necesidades.

5. Construye y ejecuta los contenedores Docker utilizando Docker Compose:

  ```bash
  docker-compose up -d
  ```

6. Instala las dependencias del proyecto:

  ```bash
  docker-compose exec app npm install   # Si utilizas NPM
  
  docker-compose exec app yarn install  # Si utilizas Yarn
  ```

7. Inicia el servidor de desarrollo:

  ```bash
  docker-compose exec app npm run dev   # Si utilizas NPM
  
  docker-compose exec app yarn dev      # Si utilizas Yarn
  ```

8. Accede a la aplicación en tu navegador web:

  ```bash
  http://localhost:3000
  ```
  
9. Uso del proyecto
  Una vez iniciado el proyecto, configure los archivos que se encuentan en la carpeta app dentro de un IDE, cada vez que se van aplicando cambios sobre los archivos del proyecto, la interfaz gráfica se irá actualizando automáticamente-
