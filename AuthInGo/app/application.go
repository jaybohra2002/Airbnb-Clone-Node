package app

import (
	"fmt"
	"net/http"
	"time"
	config "AuthInGo/config/env"
	"AuthInGo/router"
	"AuthInGo/db"
)

type Config struct {
	Addr string
}

type Application struct {
	Config *Config
	Store *db.Storage
}

func NewConfig() *Config {
	port:= config.GetString("PORT",":8080")
	return &Config{
		Addr: port,
	}
}

func NewApplication (cfg *Config) *Application{
	return &Application{
		Config: cfg,
		Store: db.NewStorage(),
	}
}

func (app *Application) Run() error{
	fmt.Println("Starting server...")
	server := &http.Server{
		Addr: app.Config.Addr,
		Handler: router.SetupRouter(),
		ReadTimeout: 10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout: 10 * time.Second,
	}
	fmt.Println("Server is running on port", app.Config.Addr)
    return server.ListenAndServe()
}