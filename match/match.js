document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const bunnyList = document.getElementById('bunny-list');

    // Data Storage
    let allBunnies = [];

    // Fetch and Initialize Data
    const fetchData = async () => {
        try {
            const response = await fetch('bunnies.csv'); // Ensure this points to the correct CSV path
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.text();
            
            // Parse CSV data using PapaParse
            const parsedData = Papa.parse(data, { header: true }).data;
            
            // Filtering out empty rows if necessary
            allBunnies = parsedData.filter(bunny => bunny['Name']); // Adjust as per the exact 'Name' header

            displayBunnies(allBunnies);
        } catch (error) {
            console.error('Error fetching or parsing the CSV file:', error);
        }
    };

    // Display Bunny Profiles
    const displayBunnies = (bunnies) => {
        const fragment = document.createDocumentFragment();

        bunnies.forEach(bunny => {
            const bunnyCard = document.createElement('div');
            bunnyCard.className = 'bunny-card';

            // Name
            const nameElement = document.createElement('h3');
            nameElement.textContent = bunny['Name'];
            bunnyCard.appendChild(nameElement);

            // Bio
            const bioElement = document.createElement('p');
            bioElement.textContent = `Bio: ${bunny['Bio']}`;
            bunnyCard.appendChild(bioElement);

            // Personality
            const personalityElement = document.createElement('p');
            personalityElement.textContent = `Personality: ${bunny['Personality']}`;
            bunnyCard.appendChild(personalityElement);

            // Activities
            const activitiesElement = document.createElement('p');
            activitiesElement.textContent = `Activities: ${bunny['Activities']}`;
            bunnyCard.appendChild(activitiesElement);

            // Living Situation
            const livingElement = document.createElement('p');
            livingElement.textContent = `Living: ${bunny['Living']}`;
            bunnyCard.appendChild(livingElement);

            // Goals
            const goalsElement = document.createElement('p');
            goalsElement.textContent = `Goals: ${bunny['Goals']}`;
            bunnyCard.appendChild(goalsElement);

            // Add to fragment
            fragment.appendChild(bunnyCard);
        });

        bunnyList.innerHTML = '';
        bunnyList.appendChild(fragment);
    };

    fetchData();
});
