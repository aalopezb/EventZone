# Etapa 1: Builder con cache de dependencias
FROM rust:1.76 AS builder

WORKDIR /app

# Copia sólo archivos Cargo.* para cachear dependencias
COPY Cargo.toml Cargo.lock ./

# Crea un directorio dummy para las dependencias
RUN mkdir src
RUN echo "fn main() {}" > src/main.rs

# Descarga y compila las dependencias (cacheable)
RUN cargo build --release
RUN rm -rf target/release/deps/myproject*

# Copia todo el código fuente real
COPY . .

# Compila el proyecto real
RUN cargo build --release

# Etapa 2: Imagen pequeña solo con binario
FROM debian:buster-slim

WORKDIR /app

# Copia el binario compilado
COPY --from=builder /app/target/release/category-tag-service .

EXPOSE 3022

CMD ["./category-tag-service"]
