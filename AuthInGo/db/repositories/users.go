package db

import "database/sql"

type UserRepository interface{
	Create() error
}

type UserRepositoryImpl struct{
	db *sql.DB
}

func Create (u *UserRepositoryImpl) error{
	return nil
}