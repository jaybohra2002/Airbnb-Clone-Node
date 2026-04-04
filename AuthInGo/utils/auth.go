package utils
import ("github.com/golang-jwt/jwt/v5"
 "golang.org/x/crypto/bcrypt"
  "time"
	"AuthInGo/config/env"
	models "AuthInGo/models"
)

func HashPassword(password string) (string, error){
	hashedPassword, err:= bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err!=nil{
		return "", err
	}
	return string(hashedPassword), nil
}

func CheckPassword(password string, hashedPassword string) bool{
	err:=bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	
	return err==nil
}

func GenerateJWT(user *models.User) (string, error){
	payload:=jwt.MapClaims{
		"email": user.Email,
		"exp": time.Now().Add(time.Hour*24).Unix(),
		"iss": "auth.in.go",
		"sub": user.ID,
	}
	token:=jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	
	jwtSecret:= Config.GetString("JWT_SECRET", "secret")
    return token.SignedString([]byte(jwtSecret))
}
