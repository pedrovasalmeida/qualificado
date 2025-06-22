package database

import (
	"api/src/configuration/env"
	"api/src/configuration/logger"
	"context"

	"github.com/jackc/pgx/v5"
)

func InitConnection() {
	// databaseUrl := "postgres://pg:admin@localhost:5432/qualificado"
	db, err := pgx.Connect(context.Background(), env.DATABASE_URL)
	if err != nil {
		logger.Error("Error while connecting with database (postgresql)", err,"initConnection")
		panic(err)
	}
	if err := db.Ping(context.Background()); err != nil {
		panic(err)
	}
}


// func init() {
// 	db, err := pgx.Connect(context.Background(), env.DATABASE_URL)
	
// 	if err != nil {
// 		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
// 		os.Exit(1)
// 	}
// 	defer db.Close(context.Background())

// 	var name string
// 	var weight int64
// 	err = db.QueryRow(context.Background(), "select name, weight from widgets where id=$1", 42).Scan(&name, &weight)
// 	if err != nil {
// 		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
// 		os.Exit(1)
// 	}

// 	fmt.Println(name, weight)
// }