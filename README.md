# 🎟️ EventZone – Distributed Platform for Event Management and Ticket Reservations

**EventZone** is a modern, scalable, and distributed platform designed for comprehensive event management, including event creation, discovery, reservations, ticket validation, and user satisfaction analytics.

---

## 🌐 General Architecture

EventZone is composed of **30 microservices grouped into 5 business domains**, implemented using various programming languages and architectural styles (REST, GraphQL, gRPC, SOAP, Event-driven).

- 🧩 **Architecture Style**: Microservices + API Gateway
- 📦 **Containers**: Docker used across all services
- ☁️ **Platforms**: EC2, Vercel, Railway, Heroku, etc.
- 🔐 **Security**: JWT, CORS, EC2 Bastion Host
- 📊 **Observability**: Prometheus, Grafana
- 📈 **Scalability**: Auto-scaling + Load Balancing

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/aalopezb/EventZone.git
cd eventzone
docker-compose up --build

# 🧩 Business Domains
User Management – Registration, login, profiles, permissions, notifications, etc.

Event Catalog – Creating, editing, and browsing events.

Reservations and Tickets – Booking, generating, validating, and managing tickets.

Event Organization – Tools for event organizers and logistics.

User Satisfaction – Feedback, reviews, complaints, and experience analysis.

# 🛠️ Technologies Used
Languages: Python, Go, Node.js, Java, Rust, Ruby, Elixir, PHP, C#, Scala, Kotlin

Databases: PostgreSQL, MongoDB, MySQL, Elasticsearch, Redis, InfluxDB

Messaging: Kafka (Event-driven architecture)

DevOps: GitHub Actions, DockerHub, Terraform

# 🔒 Security
Authentication via JWT

Access control via Roles and Permissions

Traffic protection using CORS

Restricted infrastructure access using EC2 Bastion Host