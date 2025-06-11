package main

import (
	"log/slog"
)

func main() {
	if err := run(); err != nil {
		slog.Error("Failed to run the application", "error", err)
		return
	}
	slog.Info("End of the application")
}

func run() error {
	return nil
}