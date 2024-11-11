const entriesList = document.getElementById('previousEntries');

const getJournalEntries = () => {
    let journal;
    if(localStorage.getItem('journal') === null){
        journal = [];
    }else {
        journal = JSON.parse(localStorage.getItem('journal'));
    }
    return journal;
}

const saveJournalEntry = entry => {
    const journal = getJournalEntries();
    journal.push(entry);
    localStorage.setItem('journal', JSON.stringify(journal));
}

const addJournalEntry = e => {
    e.preventDefault();
    const input = document.getElementById('newJournalEntry');

    saveJournalEntry(input.value);
    const li = document.createElement('li');
    li.classList.add('entry-box');  
    li.textContent = input.value;
    entriesList.prepend(li);

    input.value = '';
}

const displayJournalEntries = () => {
    const journalEntries = getJournalEntries();
    entriesList.innerHTML = '';

    journalEntries.reverse().forEach((entry) => {
        const li = document.createElement('li');
        li.classList.add('entry-box');  
        li.textContent = entry;
        entriesList.appendChild(li);
    });
};

window.onload = displayJournalEntries;