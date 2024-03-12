document.getElementById('user-plan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const country = document.getElementById('country').value;
    const date = document.getElementById('date').value;
    const duration = document.getElementById('duration').value;
    const motive = document.getElementById('motive').value;

    const plan = {
        username: username,
        country: country,
        date: date,
        duration: duration,
        motive: motive
    };

    // Retrieve user plan data from local storage
    let userPlanData = JSON.parse(localStorage.getItem('userPlan')) || [];

    // Check if userPlanData is an array, if not, initialize it as an empty array
    if (!Array.isArray(userPlanData)) {
        userPlanData = [];
    }

    // Push the new plan object into the userPlanData array
    userPlanData.push(plan);

    // Store user plan data back into local storage
    localStorage.setItem('userPlan', JSON.stringify(userPlanData));

    // Display an alert box to confirm successful creation
    alert('Destination created successfully!');

    // Redirect to user plan page
    window.location.href = 'myplan.html';
});
