package users_controller

import "github.com/gin-gonic/gin"

func InitUserRoutes(r *gin.RouterGroup) {
	r.GET("/api/v1/users/getById/:userId", FindUserById)
	r.GET("/api/v1/users/getByEmail/:userEmail", FindUserByEmail)
	r.POST("/api/v1/users/create", CreateUser)
	r.PUT("/api/v1/users/update/:userId", UpdateUserById)
	r.DELETE("/api/v1/users/delete/:userId", DeleteUserById)
}