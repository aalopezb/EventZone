# Imagen base
FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY . .

# Instalar dependencias
RUN npm install

# Exponer puerto
EXPOSE 3016

# Ejecutar frontend
CMD ["npm", "start"]
