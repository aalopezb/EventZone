# Etapa 1: Construcción
FROM golang:1.23.3-alpine AS builder

WORKDIR /app

# Instala dependencias del sistema
RUN apk add --no-cache git gcc musl-dev

# Copia los archivos de módulos primero para caché
COPY go.mod go.sum ./

# Actualiza y verifica las dependencias
RUN go mod tidy && go mod download && go mod verify

# Copia todo el código fuente
COPY . .

# Compila el binario
RUN go build -o event-management-service .

# Etapa 2: Imagen liviana
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/event-management-service .
EXPOSE 3020
CMD ["./event-management-service"]