package routes

import (
	users_controller "api/src/controller/users"
	service "api/src/service/user"

	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.RouterGroup) {
	userServices := service.NewUserDomainService()
	userController := users_controller.NewUserControllerInterface(userServices)
	
	users_controller.InitUserRoutes(r, userController)
}
