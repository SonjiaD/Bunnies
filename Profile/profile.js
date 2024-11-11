const personalityList = ["Extroverted", "Creative", "Sweet", "Jester"];
const activitiesList = ["Swimming", "Painting", "Hiking", "PLaying Guitar"];
const livingList = ["In Dorms", "With Parents"];
const supportList = ["Find Community", "Study Buddy"];

const editProfile = () => {
    var name = document.getElementById("name");
    name.contentEditable = true;
    //addTrait('personality','Shy');
    //createButton();

    const traits = document.getElementsByClassName('traits');
    for (let i = 0; i < traits.length; i++) {
        const elements = traits[i].getElementsByTagName('p');
        for (let j = 0; j < elements.length; j++) {
            elements[j].addEventListener('click', function() {
                elements[j].remove();
            });
        }
    }
}

function createButton() {
    const newButton = document.createElement('button');
    newButton.textContent = '+';
    newButton.className = 'littleButton';
    newButton.addEventListener('click', function() {
        alert('Button clicked!');
    });
    document.getElementById('personality').appendChild(newButton);
}

function addTrait(category, text) {
    var per = document.getElementById(category);
    const newP = document.createElement('p');
    newP.textContent = text;
    per.appendChild(newP);
}

function saveTraits(category) {
    const traitDiv = document.getElementById(category);
    const traits = [];
 
    const pElements = traitDiv.getElementsByTagName('p');
    
    for (let i = 0; i < pElements.length; i++) {
        traits.push(pElements[i].textContent);
    }
    
    let str = category.concat("traits");
    localStorage.setItem(str, JSON.stringify(traits));
}

function loadTraits(category) {
    let str = category.concat("traits");
    const savedTraits = localStorage.getItem(str);
    if (savedTraits) {
        const traits = JSON.parse(savedTraits);
        const personalityDiv = document.getElementById(category);
        
        personalityDiv.innerHTML = '';
        
        traits.forEach(trait => {
            const newP = document.createElement('p');
            newP.textContent = trait;
            personalityDiv.appendChild(newP);
        });
    }
}

const saveProfile = () => {
    var name = document.getElementById("name");
    var userName = name.innerHTML;
    localStorage.setItem('name', userName);
    name.contentEditable = false; 
    saveTraits('personality');
    saveTraits('activities');
    saveTraits('living');
    saveTraits('support');
}

const checkEdits = () => {
    let name = localStorage.getItem('name');
    if(name != null) {
        document.getElementById("name").innerHTML = name;
    }
    loadTraits('personality');
    loadTraits('activities');
    loadTraits('living');
    loadTraits('support');
    }

window.addEventListener('DOMContentLoaded', checkEdits);
window.addEventListener('DOMContentLoaded', saveProfile);