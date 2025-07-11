# 👤 Domain: User Management

The **User Management** domain handles everything related to user identity, access, profiles, preferences, notifications, and activity history within the EventZone platform.

---

## 🧩 Included Microservices

1. **User Registration** – Flask + REST + PostgreSQL  
2. **Authentication** – Node.js + REST + MongoDB  
3. **User Profiles** – FastAPI + GraphQL + PostgreSQL  
4. **Roles and Permissions** – Java + SOAP + MySQL  
5. **User Preferences** – Ruby + REST + PostgreSQL  
6. **User Notifications** – Node.js + REST + MongoDB  
7. **Activity History** – Python + Event-driven (Kafka) + MongoDB

---

## 🛠️ How to Run This Domain

Navigate to the domain folder and run all services:

```bash
cd Backend/User-domain
docker-compose up --build