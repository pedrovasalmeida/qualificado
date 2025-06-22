package env

import (
	"os"
	"strings"
)

var (
	ENV_LOGGER_LOG_OUTPUT string
	ENV_LOGGER_LOG_LEVEL string
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
	ENV_LOGGER_LOG_OUTPUT = getVariableFromEnv("LOG_OUTPUT")
	ENV_LOGGER_LOG_LEVEL = getVariableFromEnv("LOG_LEVEL")
}