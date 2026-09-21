/* Simple Toggle Knowledge Check System */

// Toggle knowledge check visibility
function toggleKnowledgeCheck(button) {
    // Handle case where markdown wraps button in <p> tag
    const parent = button.parentElement.tagName === 'P' ? button.parentElement : button;
    const content = parent.nextElementSibling;
    
    if (!content || !content.classList.contains('knowledge-check-content')) {
        console.error('Could not find knowledge-check-content element');
        return;
    }
    
    const isHidden = content.style.display === 'none' || !content.style.display;
    
    if (isHidden) {
        content.style.display = 'block';
        button.innerHTML = '▼ Hide Knowledge Check';
    } else {
        content.style.display = 'none';
        button.innerHTML = '▶ Show Knowledge Check';
    }
}

// Check answer function
function checkAnswer(button) {
    const check = button.closest('.knowledge-check');
    const selected = check.querySelector('input[type="radio"]:checked');
    const feedback = check.querySelector('.quiz-feedback');
    const correctAnswer = check.dataset.answer;
    
    if (!selected) {
        feedback.innerHTML = '<p style="color: orange;"> Please select an answer.</p>';
        feedback.style.display = 'block';
        return;
    }
    
    if (selected.value === correctAnswer) {
        feedback.innerHTML = '<p style="color: #4caf50;"> Correct!</p>';
        check.querySelector('.quiz-answer').style.display = 'block';
        button.disabled = true;
        button.textContent = ' Answered';
    } else {
        feedback.innerHTML = '<p style="color: #f44336;"> Incorrect. Try again or reveal the answer.</p>';
    }
    feedback.style.display = 'block';
}

// Reveal answer function
function revealAnswer(button) {
    const check = button.closest('.knowledge-check');
    check.querySelector('.quiz-answer').style.display = 'block';
    button.style.display = 'none';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Hide all knowledge check content by default
    document.querySelectorAll('.knowledge-check-content').forEach(content => {
        content.style.display = 'none';
    });
});