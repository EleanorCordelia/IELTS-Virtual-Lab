document.addEventListener("DOMContentLoaded", function () {
    const resultsTableBody = document.getElementById("results-tbody");
    const submitButton = document.getElementById("submit-button");
    let resultsData = [];

    // Fungsi untuk mengambil data dari results.json
    function loadResults() {
        // Ambil data dari results.json
        fetch("data/results.json")
            .then((response) => response.json())
            .then((data) => {
                resultsData = data.results;
                displayResults();
            });
        console
            .log(data)
            .catch((error) => console.error("Error loading results:", error));
    }

    // Fungsi untuk menampilkan data dalam tabel
    function displayResults() {
        resultsTableBody.innerHTML = ""; // Bersihkan tabel
        resultsData.forEach((result, index) => {
            const row = document.createElement("tr");

            // Nomor
            const cellNo = document.createElement("td");
            cellNo.textContent = index + 1;
            row.appendChild(cellNo);

            // Pertanyaan
            const cellQuestion = document.createElement("td");
            cellQuestion.textContent = result.question;
            row.appendChild(cellQuestion);

            // Jawaban
            const cellAnswer = document.createElement("td");
            cellAnswer.textContent = result.answer;
            row.appendChild(cellAnswer);

            // Aksi
            const cellActions = document.createElement("td");

            // Tombol Edit
            const editIcon = document.createElement("img");
            editIcon.src = "images/Vector.png";
            editIcon.alt = "Edit";
            editIcon.classList.add("action-icon");
            editIcon.addEventListener("click", () => editResult(result.id));
            cellActions.appendChild(editIcon);

            // Tombol Delete
            const deleteIcon = document.createElement("img");
            deleteIcon.src = "images/trash.png";
            deleteIcon.alt = "Delete";
            deleteIcon.classList.add("action-icon");
            deleteIcon.addEventListener("click", () => deleteResult(result.id));
            cellActions.appendChild(deleteIcon);

            row.appendChild(cellActions);

            resultsTableBody.appendChild(row);
        });
    }

    // Fungsi untuk mengedit data
    function editResult(id) {
        const result = resultsData.find((item) => item.id === id);
        if (result) {
            const newAnswer = prompt(
                `Edit answer for "${result.question}":`,
                result.answer
            );
            if (newAnswer !== null) {
                result.answer = newAnswer;
                displayResults();
            }
        }
    }

    // Fungsi untuk menghapus data
    function deleteResult(id) {
        if (confirm("Are you sure you want to delete this entry?")) {
            resultsData = resultsData.filter((item) => item.id !== id);
            displayResults();
        }
    }

    // Event listener untuk tombol Submit
    submitButton.addEventListener("click", () => {
        alert("Results submitted!");
        // Anda dapat menambahkan aksi lain di sini
    });

    // Memuat data saat halaman dimuat
    loadResults();
});
