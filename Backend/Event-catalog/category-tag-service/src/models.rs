use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Category {
    pub id: String,
    pub name: String,
    pub description: String,
}

#[derive(Serialize, Deserialize)]
pub struct Tag {
    pub id: String,
    pub name: String,
}
