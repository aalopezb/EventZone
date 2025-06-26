FROM rust:latest AS builder

RUN apt-get update && apt-get install -y build-essential pkg-config libssl-dev protobuf-compiler

WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY build.rs ./
COPY proto ./proto
COPY src ./src

RUN cargo build --release

FROM debian:buster-slim

WORKDIR /app

COPY --from=builder /app/target/release/category-tag-service .

EXPOSE 3022

CMD ["./category-tag-service"]
