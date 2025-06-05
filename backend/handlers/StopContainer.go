package handlers

import (
	"docker-manager/dal"
	"net/http"

	docker "github.com/fsouza/go-dockerclient"
	"github.com/gofiber/fiber/v3"
)

func StopContainerHandler(client *docker.Client) HandlerFunction {
	return HandlerFunction(
		RouteHandler(
			func(c fiber.Ctx) error {
				containerId := c.Params("id")

				err := dal.StopContainer(client, containerId)

				if err != nil {
					return err
				}

				return c.SendStatus(http.StatusOK)
			},
		),
	)
}
