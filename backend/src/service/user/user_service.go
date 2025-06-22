package service

import (
	"api/src/configuration/rest_err"
	model "api/src/model/user"
)

type userDomainService struct {}

type UserDomainService interface {
	CreateUser(model.UserDomainInterface) *rest_err.RestErr
	UpdateUser(string, model.UserDomainInterface) *rest_err.RestErr
	FindUser(string) (*model.UserDomainInterface, *rest_err.RestErr)
	DeleteUser(string) *rest_err.RestErr
}

func NewUserDomainService() UserDomainService {
	return &userDomainService{}
}