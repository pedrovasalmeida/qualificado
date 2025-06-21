package model

import (
	"api/src/configuration/logger"
	"api/src/configuration/rest_err"
	"fmt"

	"go.uber.org/zap"
)

func (ud *UserDomain) CreateUser() *rest_err.RestErr {
	logger.Info("Init createUser model", zap.String("journey", "createUser"))
	ud.EncryptPassword()
	fmt.Println(ud)
	return nil
}