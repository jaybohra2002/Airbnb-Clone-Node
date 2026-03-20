package router

import(
	"github.com/go-chi/chi/v5"
	"AuthInGo/controllers"
)

type UserRouter struct {
	userController controllers.UserController
}

func NewUserRouter(userController controllers.UserController) Router {
	return &UserRouter{
		userController: userController,
	}
}

func (r *UserRouter) Register (r chi.Router){

}
