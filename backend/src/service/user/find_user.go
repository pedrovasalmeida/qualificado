package service

import (
	"api/src/configuration/rest_err"
	model "api/src/model/user"
)

func (ud *userDomainService) FindUser(id string) (*model.UserDomainInterface, *rest_err.RestErr) {
	return nil, nil
}