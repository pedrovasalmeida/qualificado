package main

import (
	"api/src/controller/routes"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	mainRouter := gin.Default()
	routes.InitRoutes(&mainRouter.RouterGroup)
	
	if err := mainRouter.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}