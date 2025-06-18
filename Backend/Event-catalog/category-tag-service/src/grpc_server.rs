use crate::handlers::{create_category, list_categories};

let cat = create_category(&self.es, data.name, data.description).await.map_err(|e| Status::internal(e.to_string()))?;
Ok(Response::new(CategoryResponse {
    id: cat.id,
    name: cat.name,
    description: cat.description,
}))
