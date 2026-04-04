package Config

import ( "github.com/go-sql-driver/mysql"
	"database/sql"
	env "AuthInGo/config/env"
	"fmt"
)

func SetupDB()(*sql.DB, error){
	cfg:= mysql.NewConfig()
	cfg.User = env.GetString("DB_USER","root")
	cfg.Passwd = env.GetString("DB_PASS","root")
	cfg.Addr = env.GetString("DB_HOST","localhost")
	cfg.DBName = env.GetString("DB_NAME","auth_dev")
	cfg.Net = env.GetString("DB_NET","tcp")
	cfg.ParseTime = true
	fmt.Println("Connecting to db", cfg.DBName, cfg.FormatDSN())
	db, err:=sql.Open("mysql", cfg.FormatDSN())
	if err!=nil{
		fmt.Println("Error opening database", err)
		return nil, err
	}
	pingErr:=db.Ping()
	if pingErr!=nil{
		fmt.Println("Error pinging database", pingErr)
		return nil,pingErr
	}
	fmt.Println("Database connected successfully", cfg.DBName , cfg.FormatDSN() )
	return db, nil
}
