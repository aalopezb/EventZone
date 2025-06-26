mod elastic;
mod models;
pub mod handlers;
pub mod grpc_server;

use tonic::transport::Server;
use grpc_server::CategoryTagServiceImpl;
use categorytag::category_tag_service_server::CategoryTagServiceServer;

pub mod categorytag {
    tonic::include_proto!("categorytag");
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "[::1]:3022".parse()?;

    let elastic_client = elastic::connect().await?; // devuelve Elasticsearch

    let service = CategoryTagServiceImpl::new(elastic_client);

    println!("CategoryTagService gRPC server listening on {}", addr);

    Server::builder()
        .add_service(CategoryTagServiceServer::new(service))
        .serve(addr)
        .await?;

    Ok(())
}
