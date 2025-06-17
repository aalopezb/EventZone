package server

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
	var err error
	connStr := "host=host.docker.internal user=postgres password=12345 dbname=event_catalog_db sslmode=disable"
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	fmt.Println("📦 Conectado a PostgreSQL correctamente")
}
