package utils

import (
	"strings"
	"unicode/utf8"
)

func IsEmailValid(email string) bool {
	isEmailEmpty := email == ""
	emailHasAtAndDot := 
		strings.Contains(email, "@") &&
		strings.Contains(email, ".")
	return !isEmailEmpty && emailHasAtAndDot
}

func IsValidPassword(password string) bool {
	return utf8.RuneCountInString(password) >= 8
}