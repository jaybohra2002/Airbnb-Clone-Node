package controllers

import (
	"AuthInGo/services"
	"fmt"
	"net/http"
)

type UserController interface {
	//GetUserByID(w http.ResponseWriter, r *http.Request)
	CreateUser(w http.ResponseWriter, r *http.Request)
	LoginUser(w http.ResponseWriter, r *http.Request)
}

type UserControllerImpl struct {
	userService services.UserService
}

func NewUserController(userService services.UserService) UserController {
	return &UserControllerImpl{
		userService: userService,
	}
}

// func (c *UserControllerImpl) GetUserByID(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("Controller: Getting User By ID")
// 	res := c.userService.GetUserById()
// 	fmt.Println("Controller: Got User By ID", res)
// 	w.WriteHeader(http.StatusOK)
// }

func (c *UserControllerImpl) CreateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Controller: Creating User")
	res := c.userService.CreateUser()
	fmt.Println("Controller: Created User", res)
	w.Write([]byte("User Created Successfully"))
	
}

func (c* UserControllerImpl) LoginUser(w http.ResponseWriter, r *http.Request){
	fmt.Println("Controller: Logging In User")
	res, err:=c.userService.LoginUser()
	if err!=nil{
		fmt.Println("Error logging in user", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Error logging in user"))
		return
	}
	fmt.Println("Controller: Logged In User", res)
	w.Write([]byte("User Logged In Successfully"))
}