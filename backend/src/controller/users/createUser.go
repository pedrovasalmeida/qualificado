package users_controller

import (
	"api/src/configuration/validation"
	user_model "api/src/controller/users/model"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	var user_request user_model.Request

	if err := c.ShouldBindJSON(&user_request); err != nil {
		log.Printf("Error while creating user, error=%s\n", err.Error())
		restErr := validation.ValidateUserError(err)

		c.JSON(restErr.Code, restErr)
		return
	}

	user_response := &user_model.Response{
		ID: user_request.Name,
		Email: user_request.Email,
		Name: user_request.Name,
	} 
	fmt.Println(user_response)
	c.JSON(http.StatusOK, &user_response)
}
