package user_model

type Request struct {
	Email string `json:"email"`
	Password string `json:"password"`
	Name string `json:"name"`
}
