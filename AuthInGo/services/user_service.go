package services

import (
	db "AuthInGo/db/repositories"
	"fmt"
	"AuthInGo/utils"
	
)

type UserService interface {
	//GetUserById() error
	CreateUser() error
	LoginUser() (string, error)
}

type UserServiceImpl struct {
	userRepository db.UserRepository
}

func NewUserService(_userRepository db.UserRepository) UserService {
	return &UserServiceImpl{
		userRepository: _userRepository,
	}
}

// func (s *UserServiceImpl) GetUserById() error {
// 	fmt.Println("Getting User by ID")
// 	s.userRepository.Create()
// 	return nil
// }

func (s *UserServiceImpl) CreateUser() error {
	fmt.Println("Creating User")
	password:= "HarHarMahadev"
	hashedPassword, err:=utils.HashPassword(password)
	fmt.Println("Hashed Password", hashedPassword)
	if err!=nil{
		fmt.Println("Error hashing password", err)
		return err
	}
	s.userRepository.Create("user6","user6@gmail.com",hashedPassword)
	return nil
}

func (s *UserServiceImpl) LoginUser() (string, error) {
	fmt.Println("Login User")
	user, err:=s.userRepository.FindByEmail("user5@gmail.com")
	if err!=nil{
		fmt.Println("Error finding user", err)
		return "", nil
	}

	fmt.Println("User found", user)

	password:= "HarHarMahadev"
	hashedPassword:=user.Password
	isMatch := utils.CheckPassword(password, hashedPassword)
	if !isMatch{
		fmt.Println("Password does not match")
		return "", nil
	}

	fmt.Println("Password matched")
	jwtToken, err:=utils.GenerateJWT(user)
	if err!=nil{
		fmt.Println("Error generating JWT", err)
		return "", err
	}
	fmt.Println("JWT Token", jwtToken)
	return jwtToken, nil
}
