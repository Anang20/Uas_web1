document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('email').value = 'user@gmail.com';
    document.getElementById('password').value = '12345';

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah pengiriman form secara default
    
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        // Validasi input
        if (email === '' || password === '') {
            alert('Silakan isi semua field!');
            return;
        }

        login(email, password);
    });

    function login(email, password) {
        const validEmail = 'user@gmail.com';
        const validPassword = '12345';
    
        // Proses login
        if (email === validEmail && password === validPassword) {
            // Berhasil login
            alert('Login berhasil! Selamat datang!');
            localStorage.setItem('user_data', JSON.stringify({
                email: email
            }));
            // Redirect ke halaman index.html
            window.location.href = 'index.html';
        } else {
            // menampilkan pesan error jika login gagal
            document.getElementById('errorMessage').style.display = 'block';
        }
    }
})