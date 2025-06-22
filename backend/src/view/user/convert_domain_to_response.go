package view

import (
	user_model "api/src/controller/users/model"
	model "api/src/model/user"
)

func ConvertUserDomainToResponse(
	userDomain model.UserDomainInterface,
) user_model.Response {
	return user_model.Response{
		ID: userDomain.GetId(),
		Email: userDomain.GetEmail(),
		Name: userDomain.GetName(),
	}
}