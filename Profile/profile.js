

const editProfile = () => {
    var name = document.getElementById("name");
    name.contentEditable = true;
}

const saveProfile = () => {
    var name = document.getElementById("name");
    var userName = name.innerHTML;
    localStorage.setItem('name', userName);
    name.contentEditable = false; 
}

const checkEdits = () => {
    let name = localStorage.getItem('name');
    if(name != null)
        document.getElementById("name").innerHTML = name;
    }

window.addEventListener('DOMContentLoaded', checkEdits);