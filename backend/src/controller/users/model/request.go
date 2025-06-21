package user_model

type Request struct {
	Email string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6,max=32,containsany=!@#$%^&*"`
	Name string `json:"name" binding:"required,min=3,max=50"`
}
