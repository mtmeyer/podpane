package dal

import (
	"fmt"
	"io"
	"time"

	docker "github.com/fsouza/go-dockerclient"
	"github.com/gofiber/fiber/v2/log"
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

	if err != nil {
		log.Debug(err)
		return nil, err
	}

	return summary, nil
}

func GetContainerDetails(client *docker.Client, containerId string) (*docker.Container, error) {
	details, err := client.InspectContainerWithOptions(docker.InspectContainerOptions{
		ID: containerId,
	})

	if err != nil {
		return nil, err
	}

	return details, nil
}

func RestartContainer(client *docker.Client, containerId string) error {
	err := client.RestartContainer(containerId, 30)

	if err != nil {
		return err
	}

	return nil
}

func StopContainer(client *docker.Client, containerId string) error {
	err := client.StopContainer(containerId, 30)

	if err != nil {
		return err
	}

	return nil

}

func TailLogs(client *docker.Client, containerId string) (*io.PipeReader, *io.PipeWriter, error) {
	reader, writer := io.Pipe()

	since := time.Now().Add(-15 * time.Minute).Unix()

	// Start the log streaming in a goroutine
	go func() {
		err := client.Logs(docker.LogsOptions{
			Container:    containerId,
			OutputStream: writer,
			ErrorStream:  writer,
			Follow:       true,
			Stderr:       true,
			Stdout:       true,
			Since:        since,
			Timestamps:   true,
		})

		if err != nil {
			// Write error to the pipe so the WebSocket can see it
			writer.Write([]byte(fmt.Sprintf("Error tailing logs: %v\n", err)))
		}
	}()

	return reader, writer, nil
}
