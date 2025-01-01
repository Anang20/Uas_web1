document.addEventListener('DOMContentLoaded', function() {
    // Sample data statis yang akan ditampilkan
    const sampleData = [
        { id: 1, date: '2023-05-01', va_number: 987654321, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 382473248, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 234480494, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 234480494, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 234480494, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 234480494, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 234480494, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 234480494, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 234480494, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 234480494, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 234480494, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 234480494, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 234480494, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
        { id: 1, date: '2023-05-01', va_number: 234480494, payment_method: 'BCA', customer: 'John Doe', car_name: 'Avanza', car_image: './assets/images/cars/cr-v.png', rent_duration: 3, rent_cost_per_day: 300000, amount: 150000, status: 'completed' },
    ];

    // if (!localStorage.getItem('transactions')) {
        localStorage.setItem('transactions', JSON.stringify(sampleData));
    // }

    // inisal pagination
    const itemsPerPage = 5;
    let currentPage = 1;

    // Fungsi untuk mengambil data transaksi dari localStorage
    function getTransactions() {
        if (localStorage.getItem('transactions')) {
            return JSON.parse(localStorage.getItem('transactions'));
        } else {
            return [];
        }
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

        if (transactions.length === 0) {
            // Tampilkan pesan "Tidak ada data" jika tidak ada transaksi
            const noDataRow = document.createElement('tr');
            noDataRow.innerHTML = `
                <td colspan="10" style="text-align: center;">Anda belum pernah melakukan transaksi, mohon pilih mobil terlebih dahulu di beranda</td>
            `;
            tableBody.appendChild(noDataRow);
            renderPagination(0); // Render pagination kosong
            return;
        }

        // Render setiap data transaksi
        paginatedTransactions.forEach((transaction, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${startIndex + index + 1}</td>  <!-- This will display the manual number -->
                <td>${transaction.date}</td>
                <td>${transaction.va_number}</td>
                <td>${transaction.payment_method}</td>
                <td>${transaction.customer}</td>
                <td>${transaction.car_name}</td>
                <td>
                    <img src="${transaction.car_image}">
                </td>
                <td>Rp${transaction.rent_cost_per_day.toLocaleString()}</td>
                <td>${transaction.rent_duration.toLocaleString()} Hari</td>
                <td>Rp ${transaction.amount.toLocaleString()}</td>
                <td><span class="status status-${transaction.status}">${transaction.status}</span></td>
                <td>
                    ${transaction.status !== 'cancelled' ? `<button class="btn-danger cancel-button" data-id="${transaction.va_number}">Batalkan</button>` : ''}
                </td>
            `;
            tableBody.appendChild(row);
        });

        renderPagination(transactions.length);

        // Menambahkan event listener ke tombol cancel
        document.querySelectorAll('.cancel-button').forEach(button => {
            button.addEventListener('click', function() {
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
