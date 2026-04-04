package db

import "database/sql"

type Storage struct {
	UserRepository UserRepository
}

func NewStorage(_db *sql.DB) *Storage {
	return &Storage{
		UserRepository: NewUserRepository(_db),
	}
}