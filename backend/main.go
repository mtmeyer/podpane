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
		// Send a string response to the client
		return c.SendString("Backend is running...")
	})

	// Define a route for the GET method on the root path '/'
	app.Get("/containers/summary", handlers.GetSummaryHandler(dockerClient))

	// Start the server on port 3000
	log.Fatal(app.Listen(":3000"))
}
