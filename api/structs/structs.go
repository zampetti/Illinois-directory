package structs

type Department struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Profile struct {
	ID          int    `json:"id"`
	DeptId      int    `json:"deptId"`
	Description string `json:"description"`
	Email       string `json:"email"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Title       string `json:"title"`
	ImageUrl    string `json:"imageUrl"`
}

type DeptProfile struct {
	ID          int    `json:"id"`
	DeptId      int    `json:"deptId"`
	DeptName    string `json:"name"`
	Description string `json:"description"`
	Email       string `json:"email"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Title       string `json:"title"`
	ImageUrl    string `json:"imageUrl"`
}
