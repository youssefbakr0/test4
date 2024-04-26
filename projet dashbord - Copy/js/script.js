//login

function validateLogin(event) {
  event.preventDefault();
  
  // Get input values
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  
  // Check if username and password are correct
  if (username === "youssef" && password === "1234") {
    alert("login success")
    // Redirect to dashboard
    window.location.href = "../html/dashboard.html";
  } else {
    alert("Invalid username or password. Please try again.")
  }
}



function confirmTestReady() {
  // استخدام دالة confirm() لعرض رسالة تأكيد للمستخدم
  var ready = confirm("هل أنت جاهز للاختبار؟");

  // التحقق مما إذا كان المستخدم قد أكد الجاهزية أو ألغاها
  if (ready) {
    alert("ممتاز! أتمنى لك كل التوفيق في الاختبار.");
    window.location.href = "../html/index.html";
  } else {
    alert("حسنًا، يمكنك الاستعداد جيدًا والعودة عندما تكون جاهزًا.");
   // window.location.href = "../html/dashboard.html";
  }
}


// عرض فيديو الخاص بالكورس 
function changeVideo(videoPath) {
  var videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.src = videoPath;
  videoPlayer.load();
}



// Show Course Button Click Event
document.querySelectorAll('.show-course-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const link = btn.getAttribute('data-link');
    window.location.href = link;
  });
});



 

// function confirmTestReady() {
//   var ready = prompt("هل أنت مستعد للاختبار؟ (نعم/لا)");
//   if (ready && ready.toLowerCase() === "نعم") {
//     alert("ممتاز! أتمنى لك كل التوفيق في الاختبار.");
//     // تحويل المستخدم إلى الصفحة المطلوبة بواسطة window.location.href
    
//   } else {
//     alert("حسنًا، يمكنك الاستعداد جيدًا والعودة عندما تكون جاهزًا.");
//   }
// }
// عرض الاساله
let questionsData;




fetch('../jason/questions1.json')
  .then(response => response.json())
  .then(data => {
    questionsData = data;
    displayQuestions();
  });

function displayQuestions(questions) {
  const questionsContainer = document.getElementById('questions-container');
  questionsData.questions.forEach((questionData, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-container');
    const questionText = document.createElement('p');
    questionText.textContent =`${index + 1}. ${questionData.question}`;
    questionDiv.appendChild(questionText);
    if (questionData.options) {
      const optionsList = document.createElement('ul');
      optionsList.classList.add('list-unstyled');
      questionData.options.forEach(option => {
        const optionItem = document.createElement('li');
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.classList.add('mr-2');
        optionInput.name = `question${index}`;
        optionInput.value = option;
        optionItem.appendChild(optionInput);
        const optionLabel = document.createElement('label');
        optionLabel.textContent = option;
        optionItem.appendChild(optionLabel);
        optionsList.appendChild(optionItem);
      });
      questionDiv.appendChild(optionsList);
    }
    questionsContainer.appendChild(questionDiv);
  });
} 
 //end

// start submitAnswers
function submitAnswers() {
  const answers = {};
  document.querySelectorAll('input[type="radio"]').forEach(input => {
    if (input.checked) {
      const questionIndex = input.name.replace('question', '');
      answers[questionIndex] = input.value;
    }
  });
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '<h2>النتيجة:</h2>';
  let score = 0;
  questionsData.questions.forEach((questionData, index) => {
    const answer = answers[index];
    const correctAnswer = questionData.correctAnswer;
    const resultParagraph = document.createElement('p');
    if (answer === correctAnswer) {
      resultParagraph.textContent =` ${index + 1}. الإجابة صحيحة!`;
      score++;
    } else {
      resultParagraph.textContent = `${index + 1}. الإجابة خاطئة. الإجابة الصحيحة هي: ${correctAnswer}`;
    }
    resultDiv.appendChild(resultParagraph);
  });
  resultDiv.innerHTML += `<p>النتيجة الكلية: ${score} / ${questionsData.questions.length}</p>`;
}
// end submitAnswers