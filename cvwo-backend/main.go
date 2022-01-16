package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/eezj35/CVWO_app/router"
)

func main() {
	r := router.Router()
	fmt.Println("starting server...")

	log.Fatal(http.ListenAndServe(":9000", r))
}
