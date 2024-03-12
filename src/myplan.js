document.addEventListener('DOMContentLoaded', function() {
    loadUserPlan();
    
    // Add event listener to the "Create your destination" button
    document.getElementById('goto-other-page').addEventListener('click', function() {
        // Redirect to the createform.html page when the button is clicked
        window.location.href = 'createform.html';
    });
});

// Function to load user plan data from local storage
function loadUserPlan() {
    const userPlanTableBody = document.querySelector('#user-plan-table tbody');
    userPlanTableBody.innerHTML = '';

    const userPlanData = JSON.parse(localStorage.getItem('userPlan')) || [];
    userPlanData.forEach(function(plan, index) {
        const row = `
            <tr>
                <td>${plan.username}</td>
                <td>${plan.country}</td>
                <td>${plan.date}</td>
                <td>${plan.duration}</td>
                <td>${plan.motive}</td>
                <td><button class="edit-button" data-index="${index}">Edit</button></td>
                <td><button class="delete-button" data-index="${index}">Delete</button></td>
                <td><button class="detail-button" data-index="${index}">Detail</button></td>
            </tr>
        `;
        userPlanTableBody.innerHTML += row;
    });

    // Add event listeners for edit, delete, and detail buttons
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const plan = userPlanData[index];
            localStorage.setItem('editIndex', index);
            window.location.href = 'editdata.html';
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            userPlanData.splice(index, 1);
            localStorage.setItem('userPlan', JSON.stringify(userPlanData));
            loadUserPlan(); // Reload table after deletion
        });
    });

    document.querySelectorAll('.detail-button').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            localStorage.setItem('detailIndex', index);
            window.location.href = 'aboutcountry.html';
        });
    });
}
