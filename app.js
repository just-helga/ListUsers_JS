const list = document.getElementById('list');
const filter = document.getElementById('filter');
let USERS = [];

start();

filter.addEventListener('input', (event) => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = USERS.filter((user) => {
        return user.name.toLowerCase().includes(value)
    });
    render(filteredUsers);
})

async function start() {
    list.innerHTML = 'Loading...';
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        setTimeout(() => {
            list.innerHTML = '';
            USERS = data;
            render(data);
        }, 2000);
    } catch (error) {
        list.style.color = 'red';
        list.innerHTML = error.message;
    }
}

function render(users = []) {
    if (users.length === 0) {
       list.innerHTML = 'Nothing was found for your query';
    } else {
        list.innerHTML = '';
        for(let i = 0; i < users.length; i++) {
            const row = document.createElement('tr');
            row.classList.add('align-bottom');
            row.innerHTML = getTemplate(users[i]);
        
            list.appendChild(row);
        }
    }
}

function getTemplate(user) {
    return `<td>${user.name}</td>`
}