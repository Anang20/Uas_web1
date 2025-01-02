document.addEventListener('DOMContentLoaded', function () {

    // inisialisasi pagination
    const itemsPerPage = 5;
    let currentPage = 1;

    // Fungsi untuk mengambil data transaksi dari localStorage
    function getTransactions() {
        return JSON.parse(localStorage.getItem('transactions')) || [];
    }

    // Fungsi untuk memperbarui status transaksi
    function updateTransactionStatus(vaNumber, newStatus) {
        const transactions = getTransactions();
        const transactionIndex = transactions.findIndex(transaction => transaction.va_number == vaNumber);
        if (transactionIndex !== -1) {
            transactions[transactionIndex].status = newStatus;
            localStorage.setItem('transactions', JSON.stringify(transactions));
            renderTransactions(); // Re-render setelah update status
        }
    }

    // Fungsi untuk menampilkan transaksi dengan penomoran manual
    function renderTransactions() {
        const transactions = getTransactions();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedTransactions = transactions.slice(startIndex, endIndex);

        const tableBody = document.getElementById('transactionBody');
        tableBody.innerHTML = '';  // membersihkan tabel sebelum merender baris baru

        const isLoggedIn = localStorage.getItem("user_data");
        if (!isLoggedIn) {
            renderLoginMessage(tableBody);
            renderPagination(0);
            return;
        }

        if (transactions.length === 0) {
            renderNoDataMessage(tableBody);
            renderPagination(0);
            return;
        }

        // Render setiap data transaksi
        paginatedTransactions.forEach((transaction, index) => renderTransactionRow(tableBody, transaction, startIndex, index));

        renderPagination(transactions.length);
        addCancelButtonListeners();
    }

    // Fungsi untuk menampilkan pesan "Harus login"
    function renderLoginMessage(tableBody) {
        const loginRow = document.createElement('tr');
        loginRow.innerHTML = `
            <td colspan="18" style="text-align: center;">Anda harus login untuk melihat transaksi. Silakan login terlebih dahulu.</td>
        `;
        tableBody.appendChild(loginRow);
    }

    // Fungsi untuk menampilkan pesan "Tidak ada data"
    function renderNoDataMessage(tableBody) {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = `
            <td colspan="18" style="text-align: center;">Anda belum pernah melakukan transaksi, mohon pilih mobil terlebih dahulu di beranda</td>
        `;
        tableBody.appendChild(noDataRow);
    }

    // Fungsi untuk menambahkan baris transaksi
    function renderTransactionRow(tableBody, transaction, startIndex, index) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>${transaction.rental_date}</td>
            <td>${transaction.va_number}</td>
            <td>${transaction.payment_method}</td>
            <td>Rp${transaction.rent_per_day}</td>
            <td>${transaction.rent_period} Hari</td>
            <td>${transaction.total_payment}</td>
            <td>${transaction.car_name}</td>
            <td><img src="${transaction.car_image}"></td>
            <td>${transaction.rental_type}</td>
            <td>${transaction.city}</td>
            <td>${transaction.location}</td>
            <td>${transaction.full_name}</td>
            <td>${transaction.nik}</td>
            <td>${transaction.phone_number}</td>
            <td>${transaction.address}</td>
            <td><span class="status status-${transaction.status}">${transaction.status}</span></td>
            <td>
                ${transaction.status !== 'cancelled' ? `<button class="btn-danger cancel-button" data-id="${transaction.va_number}">Batalkan</button>` : ''}
            </td>
        `;
        tableBody.appendChild(row);
    }

    // Fungsi untuk menambahkan event listener pada tombol cancel
    function addCancelButtonListeners() {
        document.querySelectorAll('.cancel-button').forEach(button => {
            button.addEventListener('click', function () {
                const vaNumber = parseInt(this.getAttribute('data-id'), 10);
                updateTransactionStatus(vaNumber, 'cancelled');
            });
        });
    }

    // Fungsi untuk merender pagination
    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const paginationElement = document.getElementById('pagination');
        paginationElement.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', () => {
                currentPage = i;
                renderTransactions();
            });
            if (i === currentPage) {
                button.disabled = true;
            }
            li.appendChild(button);
            paginationElement.appendChild(li);
        }
    }

    // Render transaksi saat halaman dimuat
    renderTransactions();
});
