document.addEventListener('DOMContentLoaded', function() {
    const paymentMethodItems = [
        {
            name: 'BRI',
            image_url: './assets/images/payment-method/bri.png',
        },
        {
            name: 'BNI',
            image_url: './assets/images/payment-method/bni.png',
        },
        {
            name: 'Mandiri',
            image_url: './assets/images/payment-method/mandiri.png',
        },
    ];

    // looping card metode pembayaran
    const paymentMethodElement = document.getElementById('payment-method-list');
    paymentMethodItems.forEach(payment_method => {
        const paymentOption = document.createElement('div');
        paymentOption.classList.add('payment-option');
        paymentOption.innerHTML = `
            <input type="radio" name="paymentMethod" id="${payment_method.name}" value="${payment_method.name}">
            <label for="${payment_method.name}">
                <img src="${payment_method.image_url}" alt="${payment_method.name}">
            </label>
        `;
        paymentMethodElement.appendChild(paymentOption);
    });

     // Menangani klik pada card opsi metode pembayaran
     document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', function() {
            // Hapus kelas 'selected' dari semua opsi pembayaran
            document.querySelectorAll('.payment-option').forEach(opt => {
                opt.classList.remove('selected');
            });

            // Tambahkan kelas 'selected' ke opsi pembayaran yang diklik
            this.classList.add('selected');

            // Temukan radio button di dalam opsi pembayaran yang diklik dan centang
            const radioButton = this.querySelector('input[type="radio"]');
            if (radioButton) {
                radioButton.checked = true;
            }
        });
    });

    // Untuk memastikan radio button pertama dipilih secara default
    const firstRadioButton = document.querySelector('input[name="paymentMethod"]');
    if (firstRadioButton) {
        firstRadioButton.checked = true;
        firstRadioButton.closest('.payment-option').classList.add('selected');
    }
});