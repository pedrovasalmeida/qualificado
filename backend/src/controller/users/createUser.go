package users_controller

import (
	"api/src/configuration/rest_err"
	user_model "api/src/controller/users/model"
	"fmt"

	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	var user_request user_model.Request

	if err := c.ShouldBindJSON(&user_request); err != nil {
		restErr := rest_err.NewBadRequestError(
			fmt.Sprintf("There are some incorrect fields, error=%s\n", err.Error()),
		)

		c.JSON(restErr.Code, restErr)
		return
	}
	fmt.Println(user_request)
}
