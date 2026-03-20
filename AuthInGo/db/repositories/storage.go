package db

import "AuthInGo/db/repositories"

type Storage struct{
	UserRepository repositories.UserRepository
}

func NewStorage() *Storage {
	return &Storage{
		UserRepository: repositories.UserRepositoryImpl{},
	}
}