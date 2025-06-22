package service

import (
	"api/src/configuration/rest_err"
	model "api/src/model/user"
)

func (ud *userDomainService) UpdateUser(
	id string, 
	userDomain model.UserDomainInterface,
) *rest_err.RestErr {
	return nil
}