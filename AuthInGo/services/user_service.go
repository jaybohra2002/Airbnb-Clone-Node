package services

import(db "AuthInGo/db/repositories")

type UserService interface{
	CreateUser() error
}

type UserServiceImpl struct{
	userRepository db.UserRepository
}

func NewUserService(_userRepository db.UserRepository) UserService {
	return &UserServiceImpl{
		userRepository: _userRepository,
	}
}

func (s *UserServiceImpl) CreateUser() error {
	return nil
}