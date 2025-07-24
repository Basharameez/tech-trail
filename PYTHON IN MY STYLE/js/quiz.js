document.addEventListener('DOMContentLoaded', function() {
  // Quiz functionality
  const quizContainers = document.querySelectorAll('.quiz-container');
  
  quizContainers.forEach(container => {
    const submitButton = container.querySelector('.quiz-submit');
    const resultDisplay = container.querySelector('.quiz-result');
    const quizId = container.dataset.quizId;
    
    if (submitButton && resultDisplay) {
      submitButton.addEventListener('click', function() {
        // Collect all answers
        const answers = {};
        const questions = container.querySelectorAll('.quiz-question');
        
        questions.forEach((question, index) => {
          const questionNumber = index + 1;
          const selectedOption = question.querySelector(`input[name="q${questionNumber}"]:checked`);
          
          if (selectedOption) {
            answers[`q${questionNumber}`] = selectedOption.value;
          }
        });
        
        // Check if all questions are answered
        const totalQuestions = questions.length;
        const answeredQuestions = Object.keys(answers).length;
        
        if (answeredQuestions < totalQuestions) {
          resultDisplay.textContent = `Please answer all questions. (${answeredQuestions}/${totalQuestions} answered)`;
          resultDisplay.className = 'quiz-result incorrect';
          resultDisplay.style.display = 'block';
          return;
        }
        
        // Evaluate answers (this is where you'd check against correct answers)
        // For demonstration, we'll use these correct answers
        const correctAnswers = {
          'python-overview': {
            q1: 'b', // 1991
            q2: 'b', // Statically typed (which is NOT a characteristic of Python)
            q3: 'a'  // Guido van Rossum
          }
        };
        
        // Calculate score
        let score = 0;
        
        if (correctAnswers[quizId]) {
          const quizAnswers = correctAnswers[quizId];
          
          for (const question in answers) {
            if (answers[question] === quizAnswers[question]) {
              score++;
            }
          }
          
          const percentage = Math.round((score / totalQuestions) * 100);
          
          // Display result
          if (percentage >= 70) {
            resultDisplay.textContent = `Great job! You scored ${score}/${totalQuestions} (${percentage}%).`;
            resultDisplay.className = 'quiz-result correct';
          } else {
            resultDisplay.textContent = `You scored ${score}/${totalQuestions} (${percentage}%). Try again!`;
            resultDisplay.className = 'quiz-result incorrect';
          }
          
          resultDisplay.style.display = 'block';
        } else {
          resultDisplay.textContent = 'Quiz evaluation not available.';
          resultDisplay.className = 'quiz-result';
          resultDisplay.style.display = 'block';
        }
      });
    }
  });
});