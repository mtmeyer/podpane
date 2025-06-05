package handlers

import (
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
)

type HandlerFunction func(c fiber.Ctx) error

type APIError struct {
	StatusCode int `json:"statusCode"`
	Msg        any `json:"msg"`
}

func (e APIError) Error() string {
	return fmt.Sprintf("API Error: %d", e.StatusCode)
}

func NotFoundError(msg string) APIError {
	return APIError{
		StatusCode: http.StatusNotFound,
		Msg:        msg,
	}
}

func RouteHandler(handler HandlerFunction) HandlerFunction {
	return HandlerFunction(
		func(ctx fiber.Ctx) error {
			err := handler(ctx)

			if err != nil {
				apiErr, ok := err.(APIError)
				if ok {
					ctx.Status(apiErr.StatusCode).JSON(apiErr)
				} else {
					res := map[string]any{
						"statusCode": http.StatusInternalServerError,
						"msg":        "Internal server error",
					}

					ctx.Status(http.StatusInternalServerError).JSON(res)
				}
				log.Error(err)
			}

			return nil
		},
	)
}
