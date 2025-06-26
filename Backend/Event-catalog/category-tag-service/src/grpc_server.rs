use tonic::{Request, Response, Status};
use crate::handlers::{create_category, list_categories};
use crate::categorytag::category_tag_service_server::CategoryTag;
use crate::categorytag::{
    CategoryRequest, CategoryResponse,
    Empty,
    CategoryListResponse, // Usar CategoryListResponse porque en el proto está así, no ListCategoriesResponse
    TagRequest, TagResponse, TagListResponse,
};

use crate::elastic::Elasticsearch; // Importa la struct correcta de conexión Elasticsearch

pub struct CategoryTagServiceImpl {
    pub es: Elasticsearch,
}

impl CategoryTagServiceImpl {
    pub fn new(es: Elasticsearch) -> Self {
        Self { es }
    }
}

#[tonic::async_trait]
impl CategoryTag for CategoryTagServiceImpl {
    async fn create_category(
        &self,
        request: Request<CategoryRequest>,
    ) -> Result<Response<CategoryResponse>, Status> {
        let data = request.into_inner();

        let cat = create_category(&self.es, data.name, data.description)
            .await
            .map_err(|e| Status::internal(e.to_string()))?;

        Ok(Response::new(CategoryResponse {
            id: cat.id,
            name: cat.name,
            description: cat.description,
        }))
    }

    async fn list_categories(
        &self,
        _request: Request<Empty>,
    ) -> Result<Response<CategoryListResponse>, Status> {
        let categories = list_categories(&self.es)
            .await
            .map_err(|e| Status::internal(e.to_string()))?;

        let response = CategoryListResponse {
            categories: categories.into_iter().map(|cat| CategoryResponse {
                id: cat.id,
                name: cat.name,
                description: cat.description,
            }).collect(),
        };

        Ok(Response::new(response))
    }

    async fn create_tag(
        &self,
        _request: Request<TagRequest>,
    ) -> Result<Response<TagResponse>, Status> {
        Err(Status::unimplemented("create_tag no implementado"))
    }

    async fn list_tags(
        &self,
        _request: Request<Empty>,
    ) -> Result<Response<TagListResponse>, Status> {
        Err(Status::unimplemented("list_tags no implementado"))
    }
}
