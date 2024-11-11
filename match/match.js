// Function to handle profile swipe
function swipeProfile(action) {
    const currentProfile = document.getElementById('current-profile');
    const differencesSection = document.querySelector('.differences-section');
    const similaritiesSection = document.querySelector('.similarities-section');
    // Handle the swipe based on action (accept or reject)
    if (action === 'reject') {
        currentProfile.classList.add('outgoing'); // swipe out
        differencesSection.classList.add('active'); // show differences section
        similaritiesSection.classList.remove('active');
    } else if (action === 'accept') {
        currentProfile.classList.add('outgoing');
        similaritiesSection.classList.add('active'); // show similarities section
        differencesSection.classList.remove('active');
    }
    // Create new profile after swipe
    setTimeout(() => {
        currentProfile.remove(); // Remove the old profile
        // Reset profile for the new one
        const newProfile = currentProfile.cloneNode(true);
        newProfile.id = 'current-profile';
        newProfile.classList.remove('outgoing');
        newProfile.classList.add('active');
        
        const profileContainer = document.getElementById('profile-container');
        profileContainer.insertBefore(newProfile, similaritiesSection);
        // Reset differences and similarities sections
        differencesSection.classList.remove('active');
        similaritiesSection.classList.remove('active');
        
    }, 500); // Match this with your CSS transition duration
}
// Add event listeners to accept and reject buttons
document.getElementById('reject-btn').addEventListener('click', () => swipeProfile('reject'));
document.getElementById('accept-btn').addEventListener('click', () => swipeProfile('accept'));