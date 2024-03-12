document.addEventListener('DOMContentLoaded', function() {
    loadComments();
    
    document.getElementById('feedback-form').addEventListener('submit', function(event) {
        event.preventDefault();
        saveComment();
    });
});

function loadComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    comments.forEach(function(comment, index) {
        const li = document.createElement('li');
        li.classList.add('comment');
        
        // Create a delete button for each comment
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-comment');
        deleteButton.addEventListener('click', function() {
            deleteComment(index);
        });

        // Append comment text and delete button to the list item
        li.textContent = comment;
        li.appendChild(deleteButton);

        commentsList.appendChild(li);
    });
}

function saveComment() {
    const comment = document.getElementById('comment').value;
    if (comment.trim() === '') return; // Don't save empty comments

    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));

    loadComments(); // Reload comments after saving
    document.getElementById('feedback-form').reset(); // Reset the form
}

function deleteComment(index) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.splice(index, 1);
    localStorage.setItem('comments', JSON.stringify(comments));
    loadComments(); // Reload comments after deleting
}
