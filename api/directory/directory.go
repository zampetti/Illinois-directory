package directory

import (
	"database/sql"
	"encoding/json"
	"fmt"

	"net/http"

	"github.com/api/structs"

	_ "github.com/go-sql-driver/mysql"
)

// HomeLink establishes a quick endpoint testing function
func HomeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
}

// GetDirectory receives the profiles and their respective departments
func GetDirectory(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("mysql", "profileWriter:password@tcp(directory_db:3306)/directory")
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("Database connection successful")
	}
	defer db.Close()

	query := `SELECT profile.id, 
				profile.deptId, department.name, 
				profile.description, profile.email, 
				profile.first_name, profile.last_name, 
				profile.title, profile.imageUrl FROM profile INNER JOIN department ON profile.deptId=department.id;`

	var profiles []structs.DeptProfile
	rows, err := db.Query(query)
	if err != nil {
		fmt.Println("Query failed...", err)
	}
	for rows.Next() {
		var profile structs.DeptProfile
		err := rows.Scan(&profile.ID, &profile.DeptId, &profile.DeptName, &profile.Description, &profile.Email, &profile.FirstName, &profile.LastName, &profile.Title, &profile.ImageUrl)
		if err != nil {
			fmt.Println("Product unmarshalling failed...", err)
		}
		profiles = append(profiles, profile)
	}

	//Allow CORS here By * or specific origin
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	json.NewEncoder(w).Encode(profiles)
}
