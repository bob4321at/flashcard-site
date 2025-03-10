package main

import (
	"encoding/json"
	"fmt"
	"io"
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

type Quiz struct {
	Questions []Question `json: Questions`
}

type Test struct {
	Sentance string `json: Sentance`
}

var test_question = Quiz{
	[]Question{
		{
			"what color is grass",
			[]Answer{
				{"blue", false},
				{"green", true},
				{"yellow", false},
				{"red", false},
			},
		},
		{
			"what color is the sky",
			[]Answer{
				{"blue", true},
				{"green", false},
				{"yellow", false},
				{"red", false},
			},
		},
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

	r.POST("/test", func(c *gin.Context) {
		info, err := io.ReadAll(c.Request.Body)
		if err != nil {
			panic(err)
		}
		new_sentance := Question{}
		json.Unmarshal(info, &new_sentance)
		fmt.Println(new_sentance)

		test_question.Questions = append(test_question.Questions, new_sentance)
	})

	r.Run()
	fmt.Println("server started")
}
