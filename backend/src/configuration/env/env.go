package env

import (
	"os"
)

var (
	LOGGER_LOG_OUTPUT string
	LOGGER_LOG_LEVEL string
	DATABASE_URL string
)

func InitEnvironmentVariables() {
	LOGGER_LOG_OUTPUT = os.Getenv("LOG_OUTPUT")
	LOGGER_LOG_LEVEL = os.Getenv("LOG_LEVEL")
	DATABASE_URL = os.Getenv("DATABASE_URL")
}