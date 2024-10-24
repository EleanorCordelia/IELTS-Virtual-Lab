// scripts/auth.js

function checkLoginStatus() {
    const currentPage = window.location.pathname.split("/").pop();

    if (!sessionStorage.getItem("isLoggedIn") && currentPage !== "login.html") {
        window.location.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Mencegah form submit dan reload

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Fetch credentials from JSON file
            fetch("data/credentials.json")
                .then((response) => response.json())
                .then((data) => {
                    const user = data.users.find(
                        (user) =>
                            user.email === email && user.password === password
                    );
                    if (user) {
                        // Simpan informasi pengguna ke sessionStorage
                        sessionStorage.setItem("isLoggedIn", true);
                        sessionStorage.setItem("username", user.username);
                        sessionStorage.setItem("profilePicture", user.profilePicture);
                        sessionStorage.setItem("email", user.email); // Simpan email pengguna
                        alert("Login berhasil");
                        window.location.href = "index.html"; // Redirect ke halaman utama setelah login
                    } else {
                        alert("Email atau password salah");
                    }
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error);
                    alert("Gagal mengambil data. Silakan coba lagi nanti.");
                });
        });
    }

    // Tambahkan event listener untuk tombol logout
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            // Hapus data sessionStorage dan redirect ke login page
            sessionStorage.clear();
            window.location.href = "login.html";
        });
    }
});

checkLoginStatus();
