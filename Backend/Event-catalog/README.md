# 📚 Domain: Event Catalog

The **Event Catalog** domain is responsible for managing the core data and structure of events in EventZone. It includes the creation, classification, scheduling, availability, and recommendation of events.

---

## 🧩 Included Microservices

1. **Event Management** – Go + REST + PostgreSQL  
2. **Categories and Tags** – Rust + gRPC + Elasticsearch  
3. **Locations** – C# (.NET) + REST + PostgreSQL  
4. **Schedules** – Elixir + Event-driven + MongoDB  
5. **Availability** – Kotlin + REST + PostgreSQL  
6. **Recommendations** – Python + ML API + Elasticsearch

---

## 🛠️ How to Run This Domain

From the project root, navigate to this domain and run:

```bash
cd Backend/Event-catalog
docker-compose up --build