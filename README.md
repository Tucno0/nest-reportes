# Reportes con Nest

## Ejecutar en Dev

1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Clonar el archivo `.env.template` y renómbrelo a `.env`
4. Levantar la base de datos con `docker-compose up -d`
5. Generar el Prisma client con `npx prisma generate`
6. Levantar el servidor con `npm run start:dev`