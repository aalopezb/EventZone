use elasticsearch::{Elasticsearch, IndexParts, SearchParts};
use serde_json::{json, Value};
use uuid::Uuid;
use crate::models::Category;

pub async fn create_category(es: &Elasticsearch, name: String, description: String) -> Result<Category, Box<dyn std::error::Error>> {
    let id = Uuid::new_v4().to_string();
    let doc = json!({
        "id": &id,
        "name": name,
        "description": description
    });

    es.index(IndexParts::IndexId("categories", &id))
        .body(doc)
        .send()
        .await?;

    Ok(Category { id, name, description })
}

pub async fn list_categories(es: &Elasticsearch) -> Result<Vec<Category>, Box<dyn std::error::Error>> {
    let res = es.search(SearchParts::Index(&["categories"]))
        .body(json!({ "query": { "match_all": {} } }))
        .send()
        .await?;

    let body = res.json::<Value>().await?;
    let mut categories = Vec::new();

    if let Some(hits) = body["hits"]["hits"].as_array() {
        for hit in hits {
            if let Some(source) = hit["_source"].as_object() {
                categories.push(Category {
                    id: source["id"].as_str().unwrap_or_default().to_string(),
                    name: source["name"].as_str().unwrap_or_default().to_string(),
                    description: source["description"].as_str().unwrap_or_default().to_string(),
                });
            }
        }
    }

    Ok(categories)
}
