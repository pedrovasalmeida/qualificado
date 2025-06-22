package service

import (
	"api/src/configuration/logger"
	"api/src/configuration/rest_err"
	model "api/src/model/user"
	"fmt"
)

func (ud *userDomainService) CreateUser(
	userDomain model.UserDomainInterface,
) *rest_err.RestErr {
	logger.Info("Init createUser model", "CreateUser")
	userDomain.EncryptPassword()
	fmt.Println(userDomain.GetPassword())
	return nil
}