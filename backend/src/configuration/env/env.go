package env

import (
	"os"
	"strings"
)

var (
	LOGGER_LOG_OUTPUT string
	LOGGER_LOG_LEVEL string
	DATABASE_URL string
)

func normalizeValuesFromEnv(value string) string {
	myVar := strings.TrimSpace(value)
	return myVar
}

func getVariableFromEnv(key string) string {
	myVar := normalizeValuesFromEnv(os.Getenv(key))
	return myVar
}

func init() {
	LOGGER_LOG_OUTPUT = getVariableFromEnv("LOG_OUTPUT")
	LOGGER_LOG_LEVEL = getVariableFromEnv("LOG_LEVEL")
	DATABASE_URL = getVariableFromEnv("DATABASE_URL")
}