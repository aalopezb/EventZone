use elasticsearch::{Elasticsearch, http::transport::Transport};

pub async fn connect() -> Result<Elasticsearch, Box<dyn std::error::Error>> {
    let transport = Transport::single_node("http://localhost:9200")?;
    Ok(Elasticsearch::new(transport))
}
