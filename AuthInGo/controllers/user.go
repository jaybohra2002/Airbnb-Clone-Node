package controllers
import ("AuthInGo/services")
type UserController interface{
	CreateUser() error
}

type UserControllerImpl struct{
	userService services.UserService
}

func NewUserController(userService services.UserService) UserController {
	return &UserControllerImpl{
		userService: userService,
	}
}

func (c *UserControllerImpl) CreateUser() error {
	return nil
}