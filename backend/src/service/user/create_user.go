package service

import (
	"api/src/configuration/logger"
	"api/src/configuration/rest_err"
	model "api/src/model/user"
)

func (ud *userDomainService) CreateUser(
	userDomain model.UserDomainInterface,
) *rest_err.RestErr {
	logger.Info("Init createUser model", "CreateUser")
	return nil
}