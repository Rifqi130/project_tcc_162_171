import { BASE_URL } from "../utils.js";

document.addEventListener('DOMContentLoaded', function () {
    // --- ADMIN LOGIN HANDLER ---
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            const res = await fetch(`${BASE_URL}/admins/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: username, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('role', 'admin');
                window.location.href = '../admin/admindashboard.html';
            } else {
                document.getElementById('loginError').style.display = 'block';
                document.getElementById('loginError').innerText = data.error || 'Login failed!';
            }
        });
        return; // Stop script here if on login page
    }

    // --- ELEMENTS ---
    const memberList = document.getElementById('member-list');
    const editModal = document.getElementById('editModal') ? new bootstrap.Modal(document.getElementById('editModal')) : null;
    const editUserForm = document.getElementById('editUserForm');
    const registerForm = document.getElementById('register-form');
    let currentUserId = null;

    // --- ADMIN PAGE PROTECTION ---
    if (memberList && editModal && localStorage.getItem('role') !== 'admin') {
        window.location.href = 'loginadmin.html';
        return;
    }

    // --- RENDER MEMBERS ---
    function renderMembers(users) {
        // Jika ada 4 tabel house (memberlist.html user)
        const gryffindorList = document.getElementById('gryffindor-list');
        const slytherinList = document.getElementById('slytherin-list');
        const ravenclawList = document.getElementById('ravenclaw-list');
        const hufflepuffList = document.getElementById('hufflepuff-list');

        if (gryffindorList && slytherinList && ravenclawList && hufflepuffList) {
            // Render per house (user)
            const houseMap = {
                Gryffindor: gryffindorList,
                Slytherin: slytherinList,
                Ravenclaw: ravenclawList,
                Hufflepuff: hufflepuffList
            };
            Object.values(houseMap).forEach(el => el.innerHTML = '');
            const houseOrder = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
            houseOrder.forEach(house => {
                const filtered = users.filter(u => u.asrama === house);
                filtered.forEach((user, idx) => {
                    houseMap[house].innerHTML += `
                        <tr>
                            <td>${idx + 1}</td>
                            <td>${user.name}</td>
                        </tr>
                    `;
                });
            });
        } else if (memberList) {
            // Render satu tabel (admin)
            const role = localStorage.getItem('role');
            memberList.innerHTML = '';
            users.sort((a, b) => {
                const houseOrder = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
                const idxA = houseOrder.indexOf(a.asrama);
                const idxB = houseOrder.indexOf(b.asrama);
                if (idxA !== idxB) return idxA - idxB;
                return a.name.localeCompare(b.name);
            });
            users.forEach((user, i) => {
                memberList.innerHTML += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${user.name}</td>
                        <td>${user.asrama}</td>
                        <td>
                            ${role === 'admin' && editModal ? `
                                <button class="btn btn-warning btn-sm me-1" onclick="window.openEditModal(${user.id}, '${user.name}', '${user.asrama}')">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="window.deleteUser(${user.id})">Delete</button>
                            ` : ''}
                        </td>
                    </tr>
                `;
            });
        }
    }

    // --- FETCH MEMBERS ---
    function fetchMembers() {
        fetch(`${BASE_URL}/users`)
            .then(res => res.json())
            .then(data => renderMembers(data));
    }

    // --- REGISTER FORM (user & admin) ---
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('member-name').value;
            const asrama = document.getElementById('house').value;
            fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, asrama })
            })
            .then(res => res.json())
            .then(() => {
                fetchMembers();
                registerForm.reset();
            });
        });
    }

    // --- ADMIN: EDIT/DELETE ---
    window.openEditModal = function (id, name, asrama) {
        if (!editModal) return;
        currentUserId = id;
        document.getElementById('editName').value = name;
        document.getElementById('editAsrama').value = asrama;
        editModal.show();
    };

    if (document.getElementById('closeEditModal')) {
        document.getElementById('closeEditModal').addEventListener('click', function () {
            editModal.hide();
        });
    }

    if (editUserForm && memberList && editModal) {
        editUserForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('editName').value;
            const asrama = document.getElementById('editAsrama').value;
            fetch(`${BASE_URL}/users/${currentUserId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, asrama })
            })
            .then(res => res.json())
            .then(() => {
                fetchMembers();
                editModal.hide();
            });
        });
    }

    window.deleteUser = function (id) {
        if (!editModal) return;
        if (confirm('Are you sure you want to delete this member?')) {
            fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE' })
                .then(res => res.json())
                .then(() => fetchMembers());
        }
    };

    // --- LOGOUT & BACK BUTTONS (admin) ---
    if (document.getElementById('logoutBtn')) {
        document.getElementById('logoutBtn').onclick = function() {
            localStorage.removeItem('role');
            window.location.href = 'loginadmin.html';
        };
    }

    if (document.getElementById('backDashboardBtn')) {
        document.getElementById('backDashboardBtn').onclick = function() {
            window.location.href = 'admindashboard.html';
        };
    }

    // --- INITIAL FETCH ---
    // Untuk admin & user
    if (
        memberList ||
        (document.getElementById('gryffindor-list') &&
         document.getElementById('slytherin-list') &&
         document.getElementById('ravenclaw-list') &&
         document.getElementById('hufflepuff-list'))
    ) {
        fetchMembers();
    }

    
});