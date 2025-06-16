package user

import "time"

type UserBase struct {
	ID string `json:"id"`
	Name string `json:"name"`
	Email string `json:"email"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type UserDB struct {
	ID string
	Name string
	Email string
	Password string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type CreateUserProps struct {
	Name string
	Email string
	Password string
}

type CreateUserReturn struct {
	ID string
	Name string
	Email string
}

type GetUserByIdReturn struct {
	ID string
	Name string
	Email string
}