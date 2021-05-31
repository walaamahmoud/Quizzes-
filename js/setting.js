import {Quiz} from './quiz.js';
export class Setting
{
    constructor()
    {
        this.categoryElement = document.getElementById("category");
        this.difficultyElement = document.getElementsByName("difficulty");
        this.numberOfQuestion = document.getElementById("Number");
        this.startBtn = document.getElementById("startBtn");
        this.startBtn.addEventListener("click", this.startQuiz.bind(this));
    }
    async startQuiz()
    {
        let amount = this.numberOfQuestion.value;
        let category = this.categoryElement.value;
        let difficulty = [...this.difficultyElement].filter(element => element.checked);
        let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty[0].value}`;
        let results = await this.fetchUrl(url);
        if (results.length>0)
        {
           $("#setting").fadeOut(500, ()=>
           {
                $("#quiz").fadeIn(500);
  
           });
           new Quiz();
           
          
           
        }

    }
    async fetchUrl(url)
    {
        let response = await fetch(url);
        response =await response.json();
        return response.results;

    }

}