function highlightActiveDay() {
    const weekdays = document.querySelectorAll(".weekdays span");
    const today = new Date().getDay(); // 0 (Sun) - 6 (Sat)

    weekdays.forEach((day) => {
        if (parseInt(day.getAttribute("data-day")) === today) {
            day.classList.add("active");
        } else {
            day.classList.remove("active");
        }
    });
}

function updateUserStatsFromJSON(username) {
    fetch("data/userStats.json")
        .then((response) => response.json())
        .then((data) => {
            const user = data.users.find((u) => u.username === username);
            if (user) {
                // Update localStorage
                localStorage.setItem("speakingTime", user.speakingTime);
                localStorage.setItem("streak", user.streak);

                // Update UI
                updateUserStats();
            } else {
                console.error("User tidak ditemukan dalam JSON.");
            }
        })
        .catch((error) => {
            console.error("Error mengambil data dari userStats.json:", error);
        });
}

function updateUserStats() {
    const speakingTime = localStorage.getItem("speakingTime") || 0;
    const streak = localStorage.getItem("streak") || 0;

    if (
        document.getElementById("speaking-time") &&
        document.getElementById("streak")
    ) {
        document.getElementById(
            "speaking-time"
        ).textContent = `${speakingTime} sec`;
        document.getElementById("streak").textContent = `${streak} days`;
    } else {
        console.error(
            "Elemen untuk speaking time atau streak tidak ditemukan."
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    highlightActiveDay();
    // Replace 'Eleanor' with the username you want to load stats for
    updateUserStatsFromJSON("Eleanor");
});
