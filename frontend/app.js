const API_URL = 'http://localhost:8000';

// just testing to see can we get users from backend or not 
// async function getUsers() {
//     const response = await fetch(`${API_URL}/users`);

//     const users = await response.json();

//     console.log('Users from backend: ', users);
// }

// getUsers();


async function loadUsers() {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();

    const userList = document.getElementById('usersList');

    let html = '';
    let number = 1;
    for (const user of users) {
        html += `
        <div class = "user-item">
            <span>${number} . ${user.name} (Age: ${user.age})</span>
            <button onclick = "deleteUser(${user.id})">Delete</button>
        </div>
        `;
        number++;
    }

    userList.innerHTML = html;

    const userSelect = document.getElementById('noteUserId');
    let options = '<option value = "">Select a user</option>';
    for (const user of users) {
        options += `<option value = "${user.id}">${user.name}</option>`;
    }
    userSelect.innerHTML = options;
}

async function deleteUser(id) {
    if(!confirm('Are you sure you want to delete this user')) {
        return;
    }

    await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE'
    });

    loadUsers();
}

document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('userName').value;
    const age = document.getElementById('userAge').value;

    await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name, age: age || null
        })
    });

    document.getElementById('userName').value = '';
    document.getElementById('userAge').value= '';

    loadUsers();
});

async function loadNotes () {
    const response = await fetch(`${API_URL}/notes`);

    const notes = await response.json();

    const notesList = document.getElementById('notesList');
    
    let html = "";
    for (const note of notes) {
        html += `
            <div class = "note-item">
                <h4>${note.title}</h4>
                <p>${note.content || 'No content'}</p>
                <small>By Users #${note.userId}</small>
                <button onclick = "deleteNote(${note.id})">Delete</button>
            </div>
            `;
    } 

    notesList.innerHTML = html;
}
async function deleteNote(id) {
    if (!confirm('Delete this note?')) {
        return;
    }

    await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE'
    });

    loadNotes();
}

document.getElementById('noteForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userId = document.getElementById('noteUserId').value;
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            userId: parseInt(userId),
            title,
            content
        })
    });

    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';

    loadNotes();
})

loadNotes();
loadUsers();



