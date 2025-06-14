package utils

import (
	"fmt"

	docker "github.com/fsouza/go-dockerclient"
)

func TransformPortsToString(ports []docker.APIPort) []string {
	portStrings := []string{}
	for _, port := range ports {
		portStrings = append(portStrings, fmt.Sprintf("%d:%d | %s", port.PublicPort, port.PrivatePort, port.Type))
	}
	return portStrings
}
