document.addEventListener('DOMContentLoaded', function() {
    populateForm();
    document.getElementById('edit-user-plan-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const editIndex = localStorage.getItem('editIndex');
        const userPlanData = JSON.parse(localStorage.getItem('userPlan')) || [];

        if (editIndex !== null) {
            const plan = userPlanData[editIndex];
            plan.username = document.getElementById('username').value;
            plan.country = document.getElementById('country').value;
            plan.date = document.getElementById('date').value;
            plan.duration = document.getElementById('duration').value;
            plan.motive = document.getElementById('motive').value;

            userPlanData[editIndex] = plan;
            localStorage.setItem('userPlan', JSON.stringify(userPlanData));

            window.location.href = 'myplan.html'; // Redirect to myplan.html after update
        }
    });
});

function populateForm() {
    const editIndex = localStorage.getItem('editIndex');
    const userPlanData = JSON.parse(localStorage.getItem('userPlan')) || [];
    
    if (editIndex !== null) {
        const plan = userPlanData[editIndex];
        document.getElementById('username').value = plan.username;
        document.getElementById('country').value = plan.country;
        document.getElementById('date').value = plan.date;
        document.getElementById('duration').value = plan.duration;
        document.getElementById('motive').value = plan.motive;
    }
}
