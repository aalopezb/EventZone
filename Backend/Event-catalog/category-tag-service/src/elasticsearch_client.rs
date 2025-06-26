// src/elasticsearch_client.rs

#[derive(Clone)]
pub struct ElasticsearchClient;

impl ElasticsearchClient {
    pub fn new() -> Self {
        ElasticsearchClient
    }

    // Métodos falsos o mocks para evitar errores al compilar
    pub async fn index_category(&self, name: String, description: String) -> Result<MockCategory, String> {
        Ok(MockCategory {
            id: "1".to_string(),
            name,
            description,
        })
    }

    pub async fn get_all_categories(&self) -> Result<Vec<MockCategory>, String> {
        Ok(vec![
            MockCategory {
                id: "1".to_string(),
                name: "Ejemplo".to_string(),
                description: "Descripción".to_string(),
            }
        ])
    }
}

#[derive(Clone)]
pub struct MockCategory {
    pub id: String,
    pub name: String,
    pub description: String,
}
