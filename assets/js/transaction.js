document.addEventListener('DOMContentLoaded', () => {
    const carDetail = JSON.parse(localStorage.getItem("car-selected"));
    const rentPeriodInput = document.getElementById('rent-period');
    const rentPerDayElement = document.getElementById("detail-rentail-rent-per-day");
    const rentPeriodElement = document.getElementById("detail-rentail-rent-period");
    const rentalSubtotalElement = document.getElementById("detail-rental-subtotal");
    const taxElement = document.getElementById("detail-rental-tax");
    const totalPaymentElement = document.querySelector(".detail-rental-total-payment");
    const paymentMethodItems = getPaymentMethodItems();
    const paymentMethodElement = document.getElementById('payment-method-list');
    const form = document.querySelector('.form-container');

    // Update car details
    function updateCarDetails() {
        if (!carDetail) return console.error("Car detail tidak ditemukan di localstorage.");

        const imageElement = createImageElement(carDetail.image, carDetail.name);
        updateCarInfo(carDetail);
        document.getElementById("detail-image-car").innerHTML = '';
        document.getElementById("detail-image-car").appendChild(imageElement);
    }

    function createImageElement(src, alt) {
        const imageElement = document.createElement("img");
        imageElement.src = src;
        imageElement.alt = alt;
        imageElement.style.width = "100%";
        return imageElement;
    }

    function updateCarInfo(car) {
        document.getElementById("rental-detail-car-name").textContent = car.name;
        rentPerDayElement.textContent = `Rp ${car.price.toLocaleString()}`;
        document.getElementById("rental-detail-passenger").textContent = `${car.specs.passengers} Penumpang`;
        document.getElementById("rental-detail-transmission").textContent = car.specs.transmission;
        document.getElementById("rental-detail-cooling").textContent = car.specs.cooling;
        document.getElementById("rental-detail-door").textContent = `${car.specs.door} Pintu`;
    }

    // Update rental calculation
    function updateRentalPeriod() {
        const rentPeriod = parseInt(rentPeriodInput.value) || 0;
        const rentPerDay = carDetail ? carDetail.price : 0;
        const rentalSubtotal = rentPeriod * rentPerDay;
        const tax = rentalSubtotal * 0.02;
        const totalPayment = rentalSubtotal + tax;

        rentPeriodElement.textContent = `${rentPeriod} hari`;
        rentalSubtotalElement.textContent = `Rp ${rentalSubtotal.toLocaleString()}`;
        taxElement.textContent = `Rp ${tax.toLocaleString()}`;
        totalPaymentElement.textContent = `Rp ${totalPayment.toLocaleString()}`;
    }

    // Generate payment methods
    function generatePaymentMethods() {
        paymentMethodItems.forEach(payment_method => {
            const paymentOption = createPaymentOption(payment_method);
            paymentMethodElement.appendChild(paymentOption);
        });
        selectDefaultPaymentMethod();
    }

    function createPaymentOption(payment_method) {
        const paymentOption = document.createElement('div');
        paymentOption.classList.add('payment-option');
        paymentOption.innerHTML = `
            <input type="radio" name="payment-method" id="${payment_method.name}" value="${payment_method.name}" required>
            <label for="${payment_method.name}">
                <img src="${payment_method.image_url}" alt="${payment_method.name}">
            </label>
        `;
        paymentOption.addEventListener('click', selectPaymentMethod);
        return paymentOption;
    }

    function selectPaymentMethod() {
        document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        this.querySelector('input[type="radio"]').checked = true;
    }

    function selectDefaultPaymentMethod() {
        const firstRadioButton = document.querySelector('input[name="payment-method"]');
        if (firstRadioButton) {
            firstRadioButton.checked = true;
            firstRadioButton.closest('.payment-option').classList.add('selected');
        }
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        
        // Fungsi untuk menambahkan angka 0 di depan jika angka kurang dari 10
        const padZero = (num) => (num < 10 ? '0' + num : num);
        
        // Format dd-mm-yyyy HH:mm
        return `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${date.getFullYear()} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
      }

    // Handle form submission
    function handleFormSubmit(event) {
        event.preventDefault();

        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
        const bankCode = selectedPaymentMethod ? paymentMethodItems.find(method => method.name === selectedPaymentMethod.value).bank_code : '000';

        const newFormData = collectFormData(bankCode);
        transactions.push(newFormData);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        alert(`Selamat Tansaksi berhasil, silahkan lanjutkan pembayaran dengan Virtual Account ${newFormData.va_number}.`);
        window.location.href = 'transaction-list.html';
    }

    function collectFormData(bankCode) {
        return {
            full_name: document.getElementById('full-name').value,
            phone_number: document.getElementById('phone-number').value,
            nik: document.getElementById('nik').value,
            city: document.getElementById('city').value,
            address: document.getElementById('address').value,
            rental_type: document.querySelector('input[name="rental-type"]:checked').id,
            location: document.getElementById('location').value,
            rental_date: formatDate(document.getElementById('rental-date').value),
            rent_period: document.getElementById('rent-period').value.toLocaleString(),
            rent_per_day: carDetail.price.toLocaleString(),
            car_name: carDetail.name,
            car_image: carDetail.image,
            payment_method: document.querySelector('input[name="payment-method"]:checked')?.id || null,
            va_number: generateVirtualAccount(bankCode),
            status: 'pending',
            total_payment: totalPaymentElement.textContent,
        };
    }

    function generateVirtualAccount(bankCode) {
        const timestamp = Date.now().toString().slice(-6);
        const randomDigits = Math.floor(100000 + Math.random() * 900000);
        return `${bankCode}${timestamp}${randomDigits}`;
    }

    // Fetch payment methods
    function getPaymentMethodItems() {
        return [
            { name: 'BRI', bank_code: '002', image_url: './assets/images/payment-method/bri.png' },
            { name: 'BNI', bank_code: '009', image_url: './assets/images/payment-method/bni.png' },
            { name: 'Mandiri', bank_code: '008', image_url: './assets/images/payment-method/mandiri.png' },
        ];
    }

    // Initialize all functionalities
    updateCarDetails();
    updateRentalPeriod();
    generatePaymentMethods();
    rentPeriodInput.addEventListener('input', updateRentalPeriod);
    form.addEventListener('submit', handleFormSubmit);
});
