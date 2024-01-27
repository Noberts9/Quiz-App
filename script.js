const questions = [
    {
        question: "Web services components are written in which Markup Language?",
        answers: [
            { text: "HTML", correct:false},
            { text: "XHTML", correct:false},
            { text: "SGML", correct:false},
            { text: "XML", correct:true},
        ]
    },
    {
        question: "What short name is associated with the World Wide Web?",
        answers: [
            { text: "Internet", correct:false},
            { text: "Web", correct:true},
            { text: "Network", correct:false},
            { text: "Google", correct:false},
        ]
    },
    {
        question: "A hypermedia system lets the user retrieve what type of files?",
        answers: [
            { text: "Audio", correct:true},
            { text: "PNG", correct:false},
            { text: "Text", correct:false},
            { text: "Graphics", correct:false},
        ]
    },
    {
        question: "An interconnection of computers and enables data and resource sharing, as well as communication is called",
        answers: [
            { text: "Internet", correct:false},
            { text: "Network", correct:true},
            { text: "LAN", correct:false},
            { text: "Arpanet", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("Next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion. question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "You scored {score} out of {questions.length}!";
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})
startQuiz();