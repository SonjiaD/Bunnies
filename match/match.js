import { saveProfile } from '../Profile/profile.js';

let currentIndex = 0;

// Initialize all users
generateFakeUsers();
console.log(allUsers);

// Function to populate the initial profile
const populateProfile = (user) => {
    const currentProfile = document.getElementById("current-profile");
    const profileImg = currentProfile.querySelector("img");
    const profileName = currentProfile.querySelector("h3");
    const profileBio = currentProfile.querySelector("p");

    profileImg.src = user.getImage();
    profileImg.alt = user.getName();
    profileName.textContent = user.getName();
    profileBio.textContent = user.getBio();
};

const populateTags = (user) => {
    // Clear existing tags
    document.querySelector(".differences-section .attributes").innerHTML = "";
    document.querySelector(".similarities-section .attributes").innerHTML = "";

    // Differences Section
    const differencesAttributes = document.querySelector(".differences-section .attributes");

    const personalityDiff = document.createElement("div");
    personalityDiff.classList.add("attribute");
    personalityDiff.innerHTML = `<p>Personality</p><span class="tag">${user.getPersonality()}</span>`;
    differencesAttributes.appendChild(personalityDiff);

    const activitiesDiff = document.createElement("div");
    activitiesDiff.classList.add("attribute");
    activitiesDiff.innerHTML = `<p>Activities</p>`;
    user.getActivities().split(", ").forEach((activity) => {
        const tag = document.createElement("span");
        tag.classList.add("tag");
        tag.textContent = activity;
        activitiesDiff.appendChild(tag);
    });
    differencesAttributes.appendChild(activitiesDiff);

    const livingDiff = document.createElement("div");
    livingDiff.classList.add("attribute");
    livingDiff.innerHTML = `<p>Living Situation</p><span class="tag">${user.getLiving()}</span>`;
    differencesAttributes.appendChild(livingDiff);

    const goalsDiff = document.createElement("div");
    goalsDiff.classList.add("attribute");
    goalsDiff.innerHTML = `<p>Support Goals</p>`;
    user.getGoals().split(", ").forEach((goal) => {
        const tag = document.createElement("span");
        tag.classList.add("tag");
        tag.textContent = goal;
        goalsDiff.appendChild(tag);
    });
    differencesAttributes.appendChild(goalsDiff);

    // Similarities Section (Dummy Example: You can modify this as per your logic)
    const similaritiesAttributes = document.querySelector(".similarities-section .attributes");

    const personalitySim = document.createElement("div");
    personalitySim.classList.add("attribute");
    personalitySim.innerHTML = `<p>Personality</p><span class="tag">Shared Trait</span>`;
    similaritiesAttributes.appendChild(personalitySim);

    const activitiesSim = document.createElement("div");
    activitiesSim.classList.add("attribute");
    activitiesSim.innerHTML = `<p>Activities</p>`;
    ["Gym", "Hiking"].forEach((activity) => { // Example shared activities
        const tag = document.createElement("span");
        tag.classList.add("tag");
        tag.textContent = activity;
        activitiesSim.appendChild(tag);
    });
    similaritiesAttributes.appendChild(activitiesSim);

    const livingSim = document.createElement("div");
    livingSim.classList.add("attribute");
    livingSim.innerHTML = `<p>Living Situation</p><span class="tag">On Campus</span>`;
    similaritiesAttributes.appendChild(livingSim);

    const goalsSim = document.createElement("div");
    goalsSim.classList.add("attribute");
    goalsSim.innerHTML = `<p>Support Goals</p><span class="tag">Study Buddy</span>`;
    similaritiesAttributes.appendChild(goalsSim);
};


function swipeProfile(action) {
    console.log('swipe called');
    const currentProfile = document.getElementById("current-profile");
    const differencesSection = document.querySelector(".differences-section");
    const similaritiesSection = document.querySelector(".similarities-section");

    // Handle the swipe based on action (accept or reject)
    if (action === "reject") {
        currentProfile.classList.add("outgoing"); // swipe out
        differencesSection.classList.add("active");
        similaritiesSection.classList.remove("active");
    } else if (action === "accept") {
        currentProfile.classList.add("outgoing");
        similaritiesSection.classList.add("active");
        differencesSection.classList.remove("active");
    }

    // Wait for the animation to complete before updating the profile
    setTimeout(() => {
        currentProfile.remove(); // Remove the outgoing profile

        // Create a new profile
        const profileContainer = document.getElementById("profile-container");
        const newProfile = document.createElement("div");
        newProfile.id = "current-profile";
        newProfile.className = "profile-section incoming";

        // Add elements for the new profile
        const imgElement = document.createElement("img");
        const nameElement = document.createElement("h3");
        const bioElement = document.createElement("p");

        newProfile.append(imgElement, nameElement, bioElement);
        profileContainer.insertBefore(newProfile, similaritiesSection);

        // Populate the new profile
        currentIndex = (currentIndex + 1) % allUsers.length;
        populateProfile(allUsers[currentIndex]);

        // Trigger the animation
        setTimeout(() => {
            newProfile.classList.remove("incoming");
        }, 10); // Small delay to ensure animation is applied

        // Reset differences and similarities sections
        differencesSection.classList.remove("active");
        similaritiesSection.classList.remove("active");
    }, 500); // Match this with your CSS transition duration
}

// Ensure DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    const firstUser = allUsers[currentIndex];
    populateProfile(firstUser);

    // Add event listeners to accept and reject buttons
    const rejectBtn = document.getElementById("reject-btn");
    const acceptBtn = document.getElementById("accept-btn");

    if (rejectBtn && acceptBtn) {
        rejectBtn.addEventListener("click", () => swipeProfile("reject"));
        acceptBtn.addEventListener("click", () => swipeProfile("accept"));
    } else {
        console.error("Reject or Accept button not found in the DOM.");
    }
});

window.addEventListener('DOMContentLoaded', saveProfile);
