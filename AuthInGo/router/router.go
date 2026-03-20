package router

import ("github.com/go-chi/chi/v5"
	"AuthInGo/controllers")

type Router interface{
	Register (r chi.Router)
}


func SetupRouter(UserRouter Router) *chi.Mux {
	chiRouter := chi.NewRouter()
	rchiRouterouter.Get("/ping", controllers.Ping)
	UserRouter.Register(chiRouter)
	return chiRouter
}