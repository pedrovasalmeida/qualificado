package model

import (
	"api/src/configuration/logger"

	"golang.org/x/crypto/bcrypt"
)

type userDomain struct {
	email string
	password string
	name string
}

func (ud *userDomain) EncryptPassword() bool {
	logger.Info("Starting password encryption", "encryptPassword")
	raw := []byte(ud.password)
	hash, err := bcrypt.GenerateFromPassword(raw, bcrypt.DefaultCost)
	if err != nil {
		logger.Error("Error encrypting password", err, "encryptPassword")
		return false
	}
	logger.Info("Finish password encryption", "encryptPassword")
	ud.password = string(hash)
	return true
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

type UserDomainInterface interface {
	GetEmail() string
	GetPassword() string
	GetName() string
	EncryptPassword() bool
}

func NewUserDomain(email, password, name string) UserDomainInterface {
	return &userDomain{
		email, password, name,
	}
}