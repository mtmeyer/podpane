package main

import (
	"docker-manager/dal"
	"docker-manager/handlers"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/gofiber/fiber/v3/middleware/logger"
)

func main() {
	// Initialize a new Fiber app
	app := fiber.New()

	app.Use(logger.New())

	dockerClient, err := dal.CreateDockerClient()

	if err != nil {
		log.Fatal(err)
	}

	app.Get("/status", func(c fiber.Ctx) error {
		return c.SendString("Backend is running...")
	})

	app.Get("/containers/summary", handlers.GetSummaryHandler(dockerClient))
	app.Get("/containers/:id", handlers.GetContainerDetails(dockerClient))
	app.Post("/containers/:id/stop", handlers.StopContainerHandler(dockerClient))
	app.Post("/containers/:id/restart", handlers.RestartContainerHandler(dockerClient))

	log.Fatal(app.Listen(":3000"))
}
