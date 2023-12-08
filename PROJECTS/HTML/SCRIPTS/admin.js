// TODO: Check that current user is an admin 

const URL = "http://localhost:5503/api/users"

const request = new XMLHttpRequest();
request.open("GET", URL);

request.setRequestHeader("Access-Control-Allow-Credentials", "true");
request.setRequestHeader("Content-Type", "application/json");
    
request.onload = displayAllUsers;
request.send();

function displayAllUsers() {
    if (request.status === 200) {
        const response = JSON.parse(request.response);
        const list = document.createElement("ol");

        for (const user of response.data) {
            const div = document.createElement("div");
            
            const li = document.createElement("li");
            li.appendChild(div);
            
            const span = document.createElement("span");
            span.innerText = `${user.first_name} ${user.last_name} ${user.email}`;
            
            div.appendChild(span);

            const button = document.createElement("button");
            button.innerText = "Delete";
            button.onclick = deleteUser;

            div.appendChild(button);

            list.appendChild(li);
        }

        const body = document.getElementsByTagName("body")[0];
        body.appendChild(list);

        function deleteUser() {
            console.log("User deleted.");
        }
    }
}

function deleteUser() {
    // TODO
}


function displayUserData(users) {
    const table = document.getElementById('userTable');
    const tbody = document.createElement('tbody');

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <a href="#" class="button edit-btn" onclick="openEditModal('editModal', ${user.id})">Edit</a>
                <a href="#" class="button delete-btn" onclick="openModal('deleteModal')">Delete</a>
            </td>
        `;

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
}

function openEditModal(modalId, userId) {
    // Fetch user information from the server based on the userId
    // and populate the form fields in the edit modal
    document.getElementById('editUsername').value = 'user'; // Replace with actual data
    document.getElementById('editEmail').value = 'user@example.com'; // Replace with actual data
    document.getElementById('editRole').value = 'User'; // Replace with actual data

    openModal(modalId);
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modals if the user clicks outside the modal
window.onclick = function(event) {
    if (event.target.className === "modal") {
        event.target.style.display = "none";
    }
};

function saveChanges() {
    // Add logic to save changes to the server
    closeModal('editModal');
}

function deleteUser() {
    // Add logic to delete user from the server
    closeModal('deleteModal');
}

