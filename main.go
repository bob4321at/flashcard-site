package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Answer struct {
	Text   string `json: Text`
	R_Or_W bool   `json: R_Or_W`
}

type Question struct {
	Question string   `json: "Question"`
	Answer   []Answer `json: Answer`
}

var test_question = Question{
	"what color is grass",
	[]Answer{
		{"blue", false},
		{"green", true},
		{"yellow", false},
		{"red", false},
	},
}

func main() {
	r := gin.Default()

	r.LoadHTMLGlob("./templates/*.html")
	r.StaticFile("js/", "./templates/js/index.js")
	r.StaticFile("favicon.ico", "./favicon.ico")

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	r.GET("/question", func(c *gin.Context) {
		data, _ := json.Marshal(test_question)
		c.JSON(http.StatusOK, data)
	})

	r.Run()
	fmt.Println("server started")
}
