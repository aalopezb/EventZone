
FROM rust:latest AS builder


RUN apt-get update && apt-get install -y build-essential pkg-config libssl-dev


WORKDIR /app


COPY Cargo.toml Cargo.lock ./


RUN mkdir src && echo "fn main() {}" > src/main.rs


RUN cargo build --release


WORKDIR /app/full


COPY . .


RUN cargo build --release


FROM debian:buster-slim


WORKDIR /app


COPY --from=builder /app/full/target/release/category-tag-service .

EXPOSE 3022


CMD ["./category-tag-service"]
