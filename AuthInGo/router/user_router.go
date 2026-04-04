package router

import (
	"AuthInGo/controllers"

	"github.com/go-chi/chi/v5"
)

type UserRouter struct {
	userController controllers.UserController
}

func NewUserRouter(userController controllers.UserController) Router {
	return &UserRouter{
		userController: userController,
	}
}

func (ur *UserRouter) Register(r chi.Router) {
	//r.Get("/profile", ur.userController.GetUserByID)
	r.Post("/create", ur.userController.CreateUser)
	r.Post("/login", ur.userController.LoginUser)
}
