// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.querySelector(".progress-container");
const greeting = document.getElementById("greeting");

// Track attendance
let count = 0;
const maxCount = 50;

nameInput.addEventListener("input", function () {
  nameInput.setCustomValidity("");
});

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = nameInput.value.trim();

  if (!name) {
    nameInput.setCustomValidity("Please enter your name.");
    nameInput.reportValidity();
    return;
  }

  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // Increment count
  count++;

  // Keep the bar within its goal while the total can continue increasing.
  const progress = Math.min(count, maxCount);
  const percentage = Math.round((progress / maxCount) * 100);

  // Update total attendee count and progress
  attendeeCount.textContent = count;
  progressBar.style.width = `${percentage}%`;
  progressContainer.setAttribute("aria-valuenow", progress);

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent, 10) + 1;

  // Show personalized welcome message
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  greeting.textContent = message;
  greeting.classList.add("success-message");
  greeting.style.display = "block";

  form.reset();
});
