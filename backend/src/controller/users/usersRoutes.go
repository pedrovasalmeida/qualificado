package users_controller

import (
	"github.com/gin-gonic/gin"
)

func InitUserRoutes(r *gin.RouterGroup, userController UserControllerInterface) {
	r.GET("/api/v1/users/getById/:userId", userController.FindUserById)
	r.GET("/api/v1/users/getByEmail/:userEmail", userController.FindUserByEmail)
	r.POST("/api/v1/users/create", userController.CreateUser)
	r.PUT("/api/v1/users/update/:userId", userController.UpdateUserById)
	r.DELETE("/api/v1/users/delete/:userId", userController.DeleteUserById)
}