package db

import (
	models "AuthInGo/models"
	"database/sql"
	"fmt"
)

type UserRepository interface {
	GetByID() (*models.User, error)
	Create(userName string, email string, hashedPassword string) error
	GetAll() (*[]models.User, error)
	DeleteById() error
	FindByEmail(email string) (*models.User, error)
}

type UserRepositoryImpl struct {
	db *sql.DB
}

func (u* UserRepositoryImpl) FindByEmail(email string) (*models.User, error){
	fmt.Println("Executing the find user by email in Repository: ")
	query:=`SELECT id, name, email, password from users where email =?`
	row:=u.db.QueryRow(query, email)
	user:=&models.User{}
	err:=row.Scan(&user.ID, &user.Name, &user.Email, &user.Password)
	if err!=nil{
		if err==sql.ErrNoRows{
			fmt.Println("Row Not Found")
			return nil, err
		}
		fmt.Println("Error scanning user", err)
		return nil, err
	}
	fmt.Println("User found", user)
	return user, nil
}

func (u *UserRepositoryImpl) GetAll() (*[]models.User, error){
	fmt.Println("Executing the get all users in Repository: ")
	query:=`SELECT id, name, email, created_at, updated_at from users`
	rows, err:=u.db.Query(query)
	if err!=nil{
		fmt.Println("Error getting all users", err)
		return nil, err
	}
	defer rows.Close()
	var users []models.User
	for rows.Next(){
		user:=models.User{}
		err:=rows.Scan(&user.ID, &user.Name, &user.Email, &user.CreatedAt, &user.UpdatedAt)
		if err!=nil{
			fmt.Println("Error scanning user", err)
			return nil, err
		}
		users=append(users, user)
	}
	fmt.Println("All users found", users)
	return &users, nil
}

func (u *UserRepositoryImpl) Create(userName string, email string, hashedPassword string) error {
	fmt.Println("Executing the create user in Repository: ")

	query := `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`

	result, err := u.db.Exec(query, userName, email, hashedPassword)

	if err != nil {
		fmt.Println("Error creating user", err)
		return err
	}
	rowsAffected, rowError := result.RowsAffected()
	if rowError != nil {
		fmt.Println("Error getting rows affected", rowError)
		return rowError
	}

	if rowsAffected == 0 {
		fmt.Println("No rows affected, Error Creating User")
		return nil
	}

	fmt.Println("User created successfully", rowsAffected)
	return nil
}

func (u *UserRepositoryImpl) GetByID() (*models.User, error) {
	fmt.Println("Executing the get user by id in Repository: ")
	query := `SELECT id, name, email, created_at, updated_at from users where id =?`
	row := u.db.QueryRow(query, 1)
	user := &models.User{}
	err := row.Scan(&user.ID, &user.Name, &user.Email, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("Row Not Found")
			return nil, err
		}
		fmt.Println("Error scanning user", err)
		return nil, err
	}
	fmt.Println("User found", user)
	return user, nil
}

func NewUserRepository(_db *sql.DB) UserRepository {
	return &UserRepositoryImpl{db: _db}
}

func (u *UserRepositoryImpl) DeleteById() error {
	fmt.Println("Executing the delete user by id in Repository: ")
	query:=`DELETE FROM users WHERE id = ?`
	result, err:=u.db.Exec(query, 2)
	if err!=nil{
		fmt.Println("Error deleting user", err)
		return err
	}
	rowsAffected, rowError:=result.RowsAffected()
	if rowError!=nil{
		fmt.Println("Error getting rows affected", rowError)
		return rowError
	}
	if rowsAffected==0{
		fmt.Println("No rows affected, Error Deleting User")
		return nil
	}
	fmt.Println("User deleted successfully", rowsAffected)
	return nil
}
