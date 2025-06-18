mod grpc_server;
mod elastic;
mod models;

use tonic::transport::Server;
use grpc_server::CategoryTagServiceImpl;
use categorytag::category_tag_service_server::CategoryTagServiceServer;

mod categorytag {
    tonic::include_proto!("categorytag");
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "[::1]:3022".parse()?;
    let elastic_client = elastic::connect().await?;
    let service = CategoryTagServiceImpl::new(elastic_client);

    println!("CategoryTagService gRPC server on {}", addr);

    Server::builder()
        .add_service(CategoryTagServiceServer::new(service))
        .serve(addr)
        .await?;

    Ok(())
}
