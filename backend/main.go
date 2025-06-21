package main

import (
	"api/src/configuration/logger"
	"api/src/controller/routes"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

func main() {
	logger.Info("Starting application")
	err := godotenv.Load()
	if err != nil {
		logger.Error("Error loading .env file", err, 
			zap.String("journey", "startApplication"),
		)
		os.Exit(1)
	}

	mainRouter := gin.Default()
	routes.InitRoutes(&mainRouter.RouterGroup)
	
	if err := mainRouter.Run(":8080"); err != nil {
		logger.Error("Error starting router on port :8080", err, 
			zap.String("journey", "startApplication"),
		)
		os.Exit(1)
	}
}