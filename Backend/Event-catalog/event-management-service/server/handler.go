package server

import (
	"github.com/gin-gonic/gin"
	"net/http"
    "strconv"
)

func GetEvents(c *gin.Context) {
	rows, err := DB.Query("SELECT id, title, description, location, date FROM events")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener eventos"})
		return
	}
	defer rows.Close()

	var events []Event
	for rows.Next() {
		var e Event
		rows.Scan(&e.ID, &e.Title, &e.Description, &e.Location, &e.Date)
		events = append(events, e)
	}

	c.JSON(http.StatusOK, events)
}

func CreateEvent(c *gin.Context) {
	var e Event
	if err := c.BindJSON(&e); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	_, err := DB.Exec("INSERT INTO events (title, description, location, date) VALUES ($1, $2, $3, $4)",
		e.Title, e.Description, e.Location, e.Date)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo crear el evento"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Evento creado correctamente"})
}

func DeleteEvent(c *gin.Context) {
	id := c.Param("id")

	result, err := DB.Exec("DELETE FROM events WHERE id = $1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al eliminar evento"})
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al eliminar evento"})
		return
	}

	if rowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Evento no encontrado"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Evento eliminado correctamente"})
}


func UpdateEvent(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var e Event
	if err := c.BindJSON(&e); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	// Ejecutar la actualización
	_, err = DB.Exec(
		"UPDATE events SET title=$1, description=$2, location=$3, date=$4 WHERE id=$5",
		e.Title, e.Description, e.Location, e.Date, id,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo actualizar el evento"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Evento actualizado correctamente"})
}