package model

import (
	"api/src/configuration/logger"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type userDomain struct {
	id string
	email string
	password string
	name string
}

type UserDomainInterface interface {
	GetId() string
	GetEmail() string
	GetPassword() string
	GetName() string
}

func (ud *userDomain) encryptPassword() {
	logger.Info("Starting password encryption", "encryptPassword")
	raw := []byte(ud.password)
	hash, err := bcrypt.GenerateFromPassword(raw, bcrypt.DefaultCost)
	if err != nil {
		logger.Error("Error encrypting password", err, "encryptPassword")
		return
	}
	ud.password = string(hash)
	logger.Info("Finish password encryption", "encryptPassword")
}

func (ud *userDomain) GetId() string {
	return ud.id
}

func (ud *userDomain) GetEmail() string {
	return ud.email
}

func (ud *userDomain) GetPassword() string {
	return ud.password
}

func (ud *userDomain) GetName() string {
	return ud.name
}

func NewUserDomain(email, password, name string) UserDomainInterface {
	id := uuid.New().String()
	user := &userDomain{ id, email, password, name }
	user.encryptPassword()
	return user
}