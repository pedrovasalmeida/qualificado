package user

import (
	"api/utils"
	"fmt"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type UserRepositoryInterface interface {
	CreateUser(user CreateUserProps) *CreateUserReturn
	GetUserById(id string) *UserBase
}

type UserRepository struct {}

func (r *UserRepository) CreateUser(user CreateUserProps) *UserBase {
	isUserEmailValid := utils.IsEmailValid(user.Email)
	if !isUserEmailValid {
		return nil
	}
	isPasswordValid := utils.IsValidPassword(user.Password)
	if !isPasswordValid {
		return nil
	}
	newUuid := uuid.New()
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(user.Password),
		bcrypt.DefaultCost,
	)
	fmt.Println("hashedPassword", hashedPassword)
	if err != nil {
		return nil
	}
	return &UserBase{
		ID: newUuid.String(),
		Email: user.Email,
		Name: user.Name,
		CreatedAt: utils.GetNowDateFromBrasil(),
		UpdatedAt: utils.GetNowDateFromBrasil(),
	}
}

func (r *UserRepository) GetUserById(id string) *UserBase {
	fakeUuid := uuid.New()
	return &UserBase{
		ID: fakeUuid.String(),
		Email: "fake@email.com",
		Name: "Fake User",
		CreatedAt: utils.GetNowDateFromBrasil(),
		UpdatedAt: utils.GetNowDateFromBrasil(),
	}
}