package users_controller

import (
	"api/src/configuration/logger"
	"api/src/configuration/validation"
	user_model "api/src/controller/users/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

var (
	logJourneyCreateUser = zap.String("journey", "createUser")
)

func CreateUser(c *gin.Context) {
	logger.Info("Init CreateUser controller", logJourneyCreateUser)
	var user_request user_model.Request

	if err := c.ShouldBindJSON(&user_request); err != nil {
		logger.Error("Error trying to validate user info", err, logJourneyCreateUser)
		restErr := validation.ValidateUserError(err)

		c.JSON(restErr.Code, restErr)
		return
	}

	user_response := &user_model.Response{
		ID: user_request.Name,
		Email: user_request.Email,
		Name: user_request.Name,
	} 
	logger.Info("User created", logJourneyCreateUser)
	c.JSON(http.StatusOK, &user_response)
}
