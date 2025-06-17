package routes

import (
	users_controller "api/src/controller/users"

	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.RouterGroup) {
	users_controller.InitUserRoutes(r)
}
