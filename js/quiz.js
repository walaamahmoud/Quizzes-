export class Quiz
{
    constructor(questions, amount)
    {
        this.questions = questions;
        this.amount = amount;
        this.currentQuestionElement = document.getElementById("current") ;
        this.totalAmountElement = document.getElementById("totalAmount") ;
        this.questionElement = document.getElementById("question") ;
        this.rowAnswerElement = document.getElementById("rowAnswer") ;
        this.checkedElement = document.getElementsByName("answer"); 
        this.nextBtn = document.getElementById("next") ;
        this.tryBtn = document.getElementById("tryBtn");
        this.currentQuestion = 0;
        this.scoreElement = document.getElementById("score");
        this.score = 0;
        this.correct = false;
        this.nextBtn.addEventListener("click", this.nextQuestion.bind(this));
        this.tryBtn.addEventListener("click", this.tryAgain.bind(this));

        this.showQuestion();
       
    }
    nextQuestion()
    {
        let ckeckedAnswer = [...this.checkedElement].filter(ans => ans.checked);
        if(ckeckedAnswer.length ==0)
        {
            $(".alert").fadeIn(500);
        }
        else
        { 
            $(".alert").fadeOut(500);
            this.correct = this.ckeckedAnswer(ckeckedAnswer[0].value);
            (this.correct) ? $("#Correct").fadeIn(1000, ()=> {this.show()}) :  
            $("#inCorrect").fadeIn(1000 , ()=> {this.show()}); 
        }
    }
    show()
    {
        $("#Correct").fadeOut(0);
        $("#inCorrect").fadeOut(0);
        this.currentQuestion++;
        (this.currentQuestion< this.amount) ?  this.showQuestion() : this.finish() ;
    }
    showQuestion()
    {
        this.questionElement.innerHTML = this.questions[this.currentQuestion].question;
        this.currentQuestionElement.innerHTML = this.currentQuestion+1;
        this.totalAmountElement.innerHTML = this.amount;
        let answers = this.getAnswer(this.questions[this.currentQuestion]);
        this.showAnswer(answers);
    }
    getAnswer(currentQuestion)
    {
        let answers = [
            currentQuestion.correct_answer,
            ...currentQuestion.incorrect_answers
        ];
        let ranAnswers = [],
        i = answers.length,
        j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i+1));
            ranAnswers.push(answers[j]);
            answers.splice(j,1);
        }
        return ranAnswers;
    }
    
    showAnswer(answersArray)
    {
        let cartoona = ``;
        for (let i = 0; i < answersArray.length; i++) {
            cartoona += `
            <div class="form-check">
                        <label class="form-check-label">
                            <input type="radio" class="form-check-input" name="answer" id="q${i}" value="${ answersArray[i]}">
                            ${ answersArray[i]}
                        </label>
                    </div>
            `;
            
        }
        this.rowAnswerElement.innerHTML = cartoona;
    }
    ckeckedAnswer(checkedAnswer)
    {
        let correct = false;
        if(this.questions[this.currentQuestion].correct_answer == checkedAnswer)
        {
            correct = true;
            this.score++ ;
        }
        else
        {
            correct = false ;
        }
        return correct;
    }
    finish()
    {
        $("#quiz").fadeOut(500, ()=>
           {
                $("#finish").fadeIn(500);
  
           });
        this.showScore();
    }
    showScore()
    {
        this.scoreElement.innerHTML = this.score;
    }
    tryAgain()
    {
        $("#finish").fadeOut(500, ()=>
        {
             $("#setting").fadeIn(500);

        });
        
    }
}