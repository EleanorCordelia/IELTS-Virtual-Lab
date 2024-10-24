// scripts/profile.js

document.addEventListener("DOMContentLoaded", function () {
    // Cek apakah pengguna sudah login
    if (!sessionStorage.getItem("isLoggedIn")) {
        window.location.href = "login.html";
    } else {
        // Ambil data pengguna dari sessionStorage
        const username = sessionStorage.getItem("username");
        const email = sessionStorage.getItem("email");
        const sessionProfilePicture = sessionStorage.getItem("profilePicture");

        // Elemen DOM yang akan diperbarui
        const profileImage = document.querySelector(".profile-pic");
        const userNameElement = document.querySelector(".user-name");
        const userIdElement = document.querySelector(".user-id");
        const joinDateElement = document.querySelector(".join-date");

        // Setel nama pengguna
        userNameElement.textContent = username;

        // Cek apakah ada foto profil yang disimpan di localStorage
        const storedProfilePicture = localStorage.getItem("profilePicture");
        if (storedProfilePicture) {
            profileImage.src = storedProfilePicture;
        } else {
            profileImage.src = sessionProfilePicture;
        }

        // Ambil data statistik pengguna dari userStats.json
        fetch("data/userStats.json")
            .then((response) => response.json())
            .then((data) => {
                const userStats = data.users.find(
                    (user) => user.email === email
                );

                if (userStats) {
                    // Setel User ID dan tanggal bergabung
                    userIdElement.textContent = `User ID: ${userStats.userId}`;
                    joinDateElement.textContent = `Joined: ${userStats.joinDate}`;

                    // Perbarui statistik
                    document.querySelector(
                        ".stat-item:nth-child(1) .stat-value"
                    ).textContent = userStats.dayStreak;
                    document.querySelector(
                        ".stat-item:nth-child(2) .stat-value"
                    ).textContent = userStats.totalXP;
                    document.querySelector(
                        ".stat-item:nth-child(3) .stat-value"
                    ).textContent = userStats.currentLeague;
                    document.querySelector(
                        ".stat-item:nth-child(4) .stat-value"
                    ).textContent = userStats.top3Finishes;
                } else {
                    console.error("Data statistik pengguna tidak ditemukan.");
                }
            })
            .catch((error) => {
                console.error(
                    "Terjadi kesalahan saat mengambil data statistik:",
                    error
                );
            });

        // Kode untuk mengelola foto profil
        const profilePictureInput = document.getElementById("fileInput");
        const fileStatus = document.getElementById("file-status");
        const editIcon = document.getElementById("editIcon");

        // Trigger file input ketika ikon edit diklik
        editIcon.addEventListener("click", () => {
            profilePictureInput.click(); // Klik input secara programatik
        });

        // Event listener saat file dipilih
        profilePictureInput.addEventListener("change", function (event) {
            const file = event.target.files[0]; // Dapatkan file yang diupload

            // Periksa apakah file adalah gambar dan ukurannya <= 1MB
            if (
                file &&
                file.size <= 1048576 &&
                file.type.startsWith("image/")
            ) {
                const reader = new FileReader(); // Buat FileReader untuk membaca file

                reader.onload = function (e) {
                    profileImage.src = e.target.result; // Setel sumber gambar profil ke file yang dipilih
                    profileImage.style.objectFit = "cover"; // Pastikan gambar pas
                    fileStatus.textContent = file.name; // Tampilkan nama file

                    // Simpan foto profil ke localStorage
                    localStorage.setItem("profilePicture", e.target.result);
                };

                reader.readAsDataURL(file); // Baca file sebagai Data URL (base64)
            } else {
                fileStatus.textContent = "File tidak valid atau terlalu besar"; // Tampilkan error jika file tidak valid
                profileImage.src = "images/default-profile.png"; // Setel gambar default
            }
        });

        // Kode untuk mengelola tanda tangan
        const canvas = document.getElementById("signatureCanvas");
        const ctx = canvas.getContext("2d");
        const clearButton = document.getElementById("clearSignature");
        const saveButton = document.getElementById("saveSignature");
        const downloadLink = document.getElementById("downloadLink");

        // Variabel untuk melacak status menggambar
        let drawing = false;

        // Load tanda tangan yang disimpan dari localStorage
        const savedSignature = localStorage.getItem("signature");
        if (savedSignature) {
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            };
            img.src = savedSignature;
        }

        // Fungsi untuk memulai menggambar
        canvas.addEventListener("mousedown", function (e) {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        });

        // Fungsi untuk menggambar
        canvas.addEventListener("mousemove", function (e) {
            if (drawing) {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.strokeStyle = "#000000"; // Warna hitam untuk tanda tangan
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });

        // Berhenti menggambar
        canvas.addEventListener("mouseup", function () {
            drawing = false;
        });

        // Bersihkan canvas
        clearButton.addEventListener("click", function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Hapus tanda tangan dari localStorage
            localStorage.removeItem("signature");
        });

        // Simpan tanda tangan
        saveButton.addEventListener("click", function () {
            // Konversi canvas ke Data URL (format PNG)
            const dataURL = canvas.toDataURL("image/png");

            // Simpan tanda tangan ke localStorage
            localStorage.setItem("signature", dataURL);

            alert("Tanda tangan berhasil disimpan!");
        });
    }
});
