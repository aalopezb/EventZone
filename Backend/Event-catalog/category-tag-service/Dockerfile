# Etapa 1: Builder con Rust latest
FROM rust:latest AS builder

# Instala dependencias necesarias para compilar
RUN apt-get update && apt-get install -y build-essential pkg-config libssl-dev

# Directorio de trabajo para cacheo inicial de dependencias
WORKDIR /app

# Copia solo los archivos que definen las dependencias para acelerar el build
COPY Cargo.toml Cargo.lock ./

# Crea un main temporal para que cargo pueda compilar e indexar dependencias
RUN mkdir src && echo "fn main() {}" > src/main.rs

# Primera compilación para cachear dependencias y descargar crates
RUN cargo build --release

# Ahora cambiamos a otro directorio para el build final con el código completo,
# para no sobrescribir el directorio /app y evitar problemas con permisos y sistema de archivos
WORKDIR /app/full

# Copia TODO el código fuente real al nuevo directorio
COPY . .

# Build final optimizado con todo el código
RUN cargo build --release

# Etapa 2: Imagen runtime minimalista y ligera
FROM debian:buster-slim

# Directorio de trabajo en la imagen final
WORKDIR /app

# Copia el binario compilado desde la etapa builder (en /app/full/target/release)
COPY --from=builder /app/full/target/release/category-tag-service .

# Expone el puerto que usa tu servicio
EXPOSE 3022

# Comando para ejecutar el binario al iniciar el contenedor
CMD ["./category-tag-service"]
