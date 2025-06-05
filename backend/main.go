package main

import (
	"bufio"
	"docker-manager/dal"
	"docker-manager/handlers"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	// Initialize a new Fiber app
	app := fiber.New()

	app.Use(logger.New())

	dockerClient, err := dal.CreateDockerClient()

	if err != nil {
		log.Fatal(err)
	}

	app.Use("/ws", func(c *fiber.Ctx) error {
		// IsWebSocketUpgrade returns true if the client
		// requested upgrade to the WebSocket protocol.
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	app.Get("/status", func(c *fiber.Ctx) error {
		return c.SendString("Backend is running...")
	})

	app.Get("/containers/summary", handlers.GetSummaryHandler(dockerClient))
	app.Get("/containers/:id", handlers.GetContainerDetails(dockerClient))
	app.Post("/containers/:id/stop", handlers.StopContainerHandler(dockerClient))
	app.Post("/containers/:id/restart", handlers.RestartContainerHandler(dockerClient))

	app.Get("/ws/:id/logs", websocket.New(func(c *websocket.Conn) {
		containerId := c.Params("id")

		reader, writer, err := dal.TailLogs(dockerClient, containerId)

		if err != nil {
			log.Error(err)
		}

		done := make(chan struct{})

		// Read from pipe and send to websocket
		go func() {
			defer reader.Close()
			defer writer.Close()
			defer close(done)

			if c == nil {
				log.Error("WebSocket connection is nil")
			}

			scanner := bufio.NewScanner(reader)
			for scanner.Scan() {
				line := scanner.Text()
				log.Debug("Log line:", line)

				if err = c.WriteMessage(websocket.TextMessage, []byte(line)); err != nil {
					log.Error("WebSocket write error", err)
					break
				}
			}

			if err := scanner.Err(); err != nil {
				log.Error("Scanner error:", err)
			}
		}()

		for {
			select {
			case <-done:
				// Log streaming finished, we can exit
				log.Debug("Log streaming completed")
				return
			default:
				// Check for client messages or connection close
				_, _, err := c.ReadMessage()
				if err != nil {
					// Client disconnected or error occurred
					log.Debug("WebSocket connection closed:", err)
					return
				}
			}
		}

	},
	))

	log.Fatal(app.Listen(":3000"))
}
