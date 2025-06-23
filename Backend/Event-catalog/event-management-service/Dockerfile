
FROM golang:1.23.3-alpine AS builder

WORKDIR /app


RUN apk add --no-cache git gcc musl-dev


COPY go.mod go.sum ./


RUN go mod tidy && go mod download && go mod verify


COPY . .

RUN go build -o event-management-service .


FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/event-management-service .
EXPOSE 3020
CMD ["./event-management-service"]