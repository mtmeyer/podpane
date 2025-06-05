package handlers

import (
	"docker-manager/dal"
	"docker-manager/utils"
	"net/http"

	docker "github.com/fsouza/go-dockerclient"
	"github.com/gofiber/fiber/v2"
)

func GetContainerDetails(client *docker.Client) HandlerFunction {
	return HandlerFunction(
		RouteHandler(
			func(c *fiber.Ctx) error {
				containerId := c.Params("id")

				details, err := dal.GetContainerDetails(client, containerId)

				if err != nil {
					return err
				}

				return c.Status(http.StatusOK).JSON(ContainerSummary{
					ID:      details.ID,
					Command: details.Args,
					Created: details.Created.Unix(),
					Status:  details.State.String(),
					State:   details.State.Status,
					Ports:   utils.TransformPortsToString(details.NetworkSettings.PortMappingAPI()),
					Name:    details.Name,
					Image:   details.Image,
				})
			},
		),
	)
}
