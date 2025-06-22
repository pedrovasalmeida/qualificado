package users_controller

import (
	"api/src/configuration/logger"
	"api/src/configuration/validation"
	user_model "api/src/controller/users/model"
	model "api/src/model/user"
	view "api/src/view/user"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

var (
	logJourneyCreateUser = zap.String("journey", "createUser")
	UserDomainInterface model.UserDomainInterface
)

func (uc *userControllerInterface) CreateUser(c *gin.Context) {
	logger.Info("Init CreateUser controller", logJourneyCreateUser)
	var user_request user_model.Request

	if err := c.ShouldBindJSON(&user_request); err != nil {
		logger.Error("Error trying to validate user info", err, logJourneyCreateUser)
		restErr := validation.ValidateUserError(err)

		c.JSON(restErr.Code, restErr)
		return
	}

	domain := model.NewUserDomain(
		user_request.Email, 
		user_request.Password,
		user_request.Name,
	)
	
	if err := uc.service.CreateUser(domain); err != nil {
		c.JSON(err.Code, err)
	}

	logger.Info("User created", logJourneyCreateUser)
	c.JSON(http.StatusOK, view.ConvertUserDomainToResponse(domain))
}
