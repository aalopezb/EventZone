package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"event-management-service/server"
)

func main() {
	server.InitDB()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
	AllowOrigins: []string{
		"http://localhost:3021", // frontend propio
		"http://localhost:3027", // frontend del microservicio de horarios
	},
	AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
	AllowHeaders:     []string{"Origin", "Content-Type"},
	AllowCredentials: true,
	MaxAge:           12 * time.Hour,
}))

	r.GET("/events", server.GetEvents)
	r.POST("/events", server.CreateEvent)
	r.PUT("/events/:id", server.UpdateEvent)     // <-- Ruta para editar evento
	r.DELETE("/events/:id", server.DeleteEvent)  // <-- Ruta para eliminar evento

	r.Run(":3020")
}
