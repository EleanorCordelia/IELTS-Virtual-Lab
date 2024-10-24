// scripts/script.js

function loadHeader() {
    fetch("partials/header.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("header").innerHTML = data;

            // Setelah header dimuat, perbarui informasi pengguna
            updateUserInfo();

            // Tambahkan event listener untuk menu toggle setelah header dimuat
            const menuToggle = document.getElementById("menu-toggle");
            const navMenu = document.getElementById("nav-menu");

            if (menuToggle && navMenu) {
                menuToggle.addEventListener("click", function () {
                    menuToggle.classList.toggle("active");
                    navMenu.classList.toggle("active");
                });
            }
        });
}

function loadMain() {
    fetch("main.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("main").innerHTML = data;
        });
}

function updateUserInfo() {
    const userInfo = document.querySelector(".user-info");
    if (userInfo) {
        const username = sessionStorage.getItem("username");
        const profilePicture = sessionStorage.getItem("profilePicture");

        if (username && profilePicture) {
            userInfo.innerHTML = `
                <a href="profile.html" class="user">${username}</a>
                <a href="profile.html">
                    <img src="${profilePicture}" class="profile-pic-header" alt="Profile Picture" />
                </a>
                <button id="logoutButton" class="logout-button">Logout</button>
            `;

            // Tambahkan event listener untuk tombol logout
            const logoutButton = document.getElementById("logoutButton");
            if (logoutButton) {
                logoutButton.addEventListener("click", function () {
                    // Hapus data sessionStorage dan redirect ke halaman login
                    sessionStorage.clear();
                    window.location.href = "login.html";
                });
            }
        } else {
            // Jika tidak ada informasi pengguna, tampilkan link login
            userInfo.innerHTML = `
                <a href="login.html" class="login-link">Login</a>
            `;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadHeader();

    // Kode event listener dipindahkan ke dalam loadHeader()

    // Periksa apakah halaman saat ini adalah index.html
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "" || currentPage === "index.html") {
        loadMain();
    }
});
