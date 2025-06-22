package logger

import (
	"api/src/configuration/env"
	"os"
	"strings"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var (
	log *zap.Logger
	zapIdentificatorKey = "flow"
)

func getZapOutputPaths() string {
	output := strings.ToLower(strings.TrimSpace(os.Getenv(env.LOGGER_LOG_OUTPUT)))
	if output == "" {
		return "stdout"
	}
	return output
}

func getZapLevels() zapcore.Level {
	switch strings.ToLower(strings.TrimSpace(os.Getenv(env.LOGGER_LOG_LEVEL))) {
		case "info":
			return zapcore.InfoLevel
		case "error":
			return zapcore.ErrorLevel
		case "debug":
			return zapcore.DebugLevel
		default:
			return zapcore.InfoLevel
	}
}

func init() {
	logConfig := zap.Config{
		OutputPaths: []string{getZapOutputPaths()},
		Level: zap.NewAtomicLevelAt(getZapLevels()),
		Encoding: "json",
		EncoderConfig: zapcore.EncoderConfig{
			LevelKey: "level",
			TimeKey: "time",
			MessageKey: "message",
			EncodeTime: zapcore.ISO8601TimeEncoder,
			EncodeLevel: zapcore.LowercaseLevelEncoder,
			EncodeCaller: zapcore.ShortCallerEncoder,
		},
	}

	log, _ = logConfig.Build()
}

func Info(message string, identificator string, tags ...zap.Field) {
	if identificator != "" {
		f := zap.String(zapIdentificatorKey, identificator)
		tags = append([]zap.Field{f}, tags...)
	}
	log.Info(message, tags...)
	log.Sync()
}

func Error(message string, err error, identificator string, tags ...zap.Field) {
	if identificator != "" {
		f := zap.String(zapIdentificatorKey, identificator)
		tags = append([]zap.Field{f}, tags...)
	}
	tags = append(tags, zap.NamedError("error", err))
	log.Info(message, tags...)
	log.Sync()
}