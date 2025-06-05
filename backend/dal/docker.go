package dal

import (
	"fmt"

	docker "github.com/fsouza/go-dockerclient"
	"github.com/gofiber/fiber/v3/log"
)

func CreateDockerClient() (*docker.Client, error) {
	client, err := docker.NewClientFromEnv()
	if err != nil {
		fmt.Println("Unable to create docker client")
		return nil, err
	}

	return client, nil
}

func ListContainers(client *docker.Client) ([]docker.APIContainers, error) {
	summary, err := client.ListContainers(docker.ListContainersOptions{All: true})
	log.Debug("Response from docker")

	if err != nil {
		log.Debug(err)
		return nil, err
	}

	return summary, nil
}
