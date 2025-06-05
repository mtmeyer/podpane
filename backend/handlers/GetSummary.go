package handlers

import (
	"docker-manager/dal"
	"docker-manager/utils"

	docker "github.com/fsouza/go-dockerclient"
	"github.com/gofiber/fiber/v3"
)

type ContainerPorts struct {
}

type ContainerSummary struct {
	ID      string   `json:"id"`
	Command []string `json:"command"`
	Created int64    `json:"created"`
	Status  string   `json:"status"`
	State   string   `json:"state"`
	Ports   []string `json:"ports"`
	Name    string   `json:"name"`
	Image   string   `json:"image"`
}

type GetSummaryResponse struct {
	ContainerCount int32              `json:"containerCount"`
	ExitedCount    int32              `json:"exitedCount"`
	RunningCount   int32              `json:"runningCount"`
	Containers     []ContainerSummary `json:"containers"`
}

func GetSummaryHandler(client *docker.Client) HandlerFunction {
	return HandlerFunction(
		RouteHandler(
			func(c fiber.Ctx) error {
				summary, err := dal.ListContainers(client)

				if err != nil {
					return err
				}

				var totalCount int32 = int32(len(summary))
				var exitedCount int32 = 0
				var runningCount int32 = 0
				containers := []ContainerSummary{}

				for _, container := range summary {
					if container.State == "exited" {
						exitedCount++
					} else if container.State == "running" {
						runningCount++
					}

					containers = append(containers, ContainerSummary{
						ID:      container.ID,
						Command: []string{container.Command},
						Created: container.Created,
						Status:  container.Status,
						State:   container.State,
						Ports:   utils.TransformPortsToString(container.Ports),
						Name:    container.Names[0],
						Image:   container.Image,
					})
				}

				return c.JSON(GetSummaryResponse{
					ContainerCount: totalCount,
					ExitedCount:    exitedCount,
					RunningCount:   runningCount,
					Containers:     containers,
				})
			},
		),
	)
}
