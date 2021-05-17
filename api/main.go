package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/api/directory"
	"github.com/gorilla/mux"
)

func main() {

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", directory.HomeLink)
	router.HandleFunc("/directory", directory.GetDirectory).Methods("GET", "OPTIONS")

	srv := &http.Server{
		Handler:      router,
		Addr:         ":3000",
		WriteTimeout: 30 * time.Second,
		ReadTimeout:  30 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
	fmt.Println("api running on port 3000...")

}
