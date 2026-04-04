package app

import (
	config "AuthInGo/config/env"
	"AuthInGo/controllers"
	dbStore "AuthInGo/db/repositories"
	"AuthInGo/router"
	"AuthInGo/services"
	"fmt"
	"net/http"
	"time"

	//user "AuthInGo/db/repositories"
	dbConfig "AuthInGo/config/db"
)

type Config struct {
	Addr string
}

type Application struct {
	Config *Config
	Store  *dbStore.Storage
}

func NewConfig() *Config {
	port := config.GetString("PORT", ":8080")
	return &Config{
		Addr: port,
	}
}

func NewApplication(cfg *Config) *Application {
	return &Application{
		Config: cfg,
	}
}

func (app *Application) Run() error {
	fmt.Println("Starting server...")

	db, err := dbConfig.SetupDB()
	if err != nil {
		fmt.Println("Error setting up database", err)
		return err
	}
	app.Store = dbStore.NewStorage(db)
	userService := services.NewUserService(app.Store.UserRepository)
	userController := controllers.NewUserController(userService)
	userRouter := router.NewUserRouter(userController)

	server := &http.Server{
		Addr:         app.Config.Addr,
		Handler:      router.SetupRouter(userRouter),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  10 * time.Second,
	}
	fmt.Println("Server is running on port", app.Config.Addr)
	return server.ListenAndServe()
}
