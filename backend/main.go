package main

import (
	database "api/src/configuration/database/postgresql"
	"api/src/configuration/env"
	"api/src/configuration/logger"
	"api/src/controller/routes"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	logger.Info("Starting application", "startApplication")
	initServerSettings()
	initRoutesAndServer()
}

func initServerSettings() {
	err := godotenv.Load()
	if err != nil {
		logger.Error("Error loading .env file", err, "startApplication")
		os.Exit(1)
	}
	env.InitEnvironmentVariables()
	logger.Info("Environment variables loaded", "startApplication")
	database.InitConnection()
}

func initRoutesAndServer() {
	mainRouter := gin.Default()
	routes.InitRoutes(&mainRouter.RouterGroup)
	
	if err := mainRouter.Run(":8080"); err != nil {
		logger.Error("Error starting router on port :8080", err, "startApplication")
		os.Exit(1)
	}
	logger.Info("Server initialized. Listening...", "startApplication")
}