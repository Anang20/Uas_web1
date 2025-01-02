document.addEventListener('DOMContentLoaded', function() {
    // user profile
    const authButtons = document.getElementById('authButtons');
    const userProfile = document.getElementById('userProfile');
    const userEmailSpan = document.getElementById('userEmail');
    const popover = document.getElementById('popover');
    const logoutButton = document.getElementById('logout-button');

    userProfile.addEventListener('click', () => {
        const isVisible = popover.style.display === 'block';
        popover.style.display = isVisible ? 'none' : 'block';
    });

    // menagani logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user_data');
        window.location.href = 'login.html';
    });
    
    // hamburger menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // menangani cek status user sudah login atau belum di header
    function checkUserStatus() {
        const userData = localStorage.getItem('user_data');
        if (userData) {
            // Jika user login
            const user = JSON.parse(userData);
            userEmailSpan.textContent = user.email;
            authButtons.style.display = 'none';
            userProfile.style.display = 'inline-block';
        } else {
            // Jika user belum login
            authButtons.style.display = 'flex';
            userProfile.style.display = 'none';
        }
    }
    checkUserStatus();
    
    // slider brand
    const brandSliderTrack = document.querySelector('.brands-slider-track');
    const images = Array.from(brandSliderTrack.children);

    // Gandakan elemen untuk seamless effect
    images.forEach((img) => {
        const clone = img.cloneNode(true);
        brandSliderTrack.appendChild(clone);
    });

    function generateStars(rating) {
        const fullStars = Math.floor(rating); // Bintang penuh
        const emptyStars = 5 - fullStars; // Bintang kosong
        let starsHTML = '';
    
        // Menambahkan bintang penuh
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '★'; // Bintang penuh
        }
        
        // Menambahkan bintang kosong jika perlu
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '☆'; // Bintang kosong
        }
    
        return starsHTML;
    }

    // Car data
    const cars = [
        {
            name: 'Honda CR-V',
            image: './assets/images/cars/cr-v.png',
            rating: 5,
            reviews: 145,
            specs: {
                passengers: 4,
                transmission: 'Matic',
                cooling: 'AC',
                door: 4
            },
            price: 1100000
        },
        {
            name: 'Daihatsu Terios',
            image: './assets/images/cars/daihatsu-terios.png',
            rating: 5,
            reviews: 135,
            specs: {
                passengers: 4,
                transmission: 'Matic',
                cooling: 'AC',
                door: 4
            },
            price: 900000
        },
        {
            name: 'Suzuki Ertiga',
            image: './assets/images/cars/ertiga.png',
            rating: 4.9,
            reviews: 125,
            specs: {
                passengers: 4,
                transmission: 'Matic',
                cooling: 'AC',
                door: 4
            },
            price: 850000
        },
        {
            name: 'Honda Brio',
            image: './assets/images/cars/brio.png',
            rating: 4,
            reviews: 125,
            specs: {
                passengers: 4,
                transmission: 'Matic',
                cooling: 'AC',
                door: 4
            },
            price: 700000
        },
        {
            name: 'Toyota Innova 2.0',
            image: './assets/images/cars/innova-2.0.png',
            rating: 4.5,
            reviews: 155,
            specs: {
                passengers: 4,
                transmission: 'Matic',
                cooling: 'AC',
                door: 4
            },
            price: 750000
        },
        {
            name: 'Toyota Innova 2.5',
            image: './assets/images/cars/innova-2.5.png',
            rating: 4.8,
            reviews: 155,
            specs: {
                passengers: 4,
                transmission: 'Matic',
                cooling: 'AC',
                door: 4
            },
            price: 750000
        },
        {
            name: 'Toyota Rush',
            image: './assets/images/cars/rush.png',
            rating: 5.0,
            reviews: 155,
            specs: {
                passengers: 4,
                transmission: 'Matic',
                cooling: 'AC',
                door: 4
            },
            price: 1000000
        },
        {
            name: 'Toyota Avanza',
            image: './assets/images/cars/toyota-avanza.png',
            rating: 4.9,
            reviews: 155,
            specs: {
                passengers: 4,
                transmission: 'Matic',
                cooling: 'AC',
                door: 4
            },
            price: 950000
        },
    ];

    // Populate car cards
    const carsGrid = document.querySelector('.cars-grid');
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.classList.add('car-card');
        const starsHTML = generateStars(car.rating);
        carCard.innerHTML = `
            <div class="wrap-cars-image">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="car-details">
                <div class="car-header">
                    <h3>${car.name}</h3>
                    <div class="rating">
                        <span>${car.rating}</span>
                        <div class="stars">${starsHTML}</div>
                        <span>(${car.reviews} reviews)</span>
                    </div>
                </div>
                <div class="car-specs">
                    <div class="car-spec">
                        <img src="./assets/images/icons/passenger.svg" alt="Passenger">
                        <span>${car.specs.passengers} Orang</span>
                    </div>
                    <div class="car-spec">
                        <img src="./assets/images/icons/transmision.svg" alt="Transmission">
                        <span>${car.specs.transmission}</span>
                    </div>
                    <div class="car-spec">
                        <img src="./assets/images/icons/cooling.svg" alt="Cooling">
                        <span>${car.specs.cooling}</span>
                    </div>
                    <div class="car-spec">
                        <img src="./assets/images/icons/door.svg" alt="Door">
                        <span>${car.specs.door} Pintu</span>
                    </div>
                </div>
                <div class="car-price">
                    <span>Harga</span>
                    <div>
                        <span class="price">Rp ${Intl.NumberFormat('id-ID').format(car.price)}</span>
                        <span class="day">/hari</span>
                    </div>
                </div>
                <button class="btn-primary btn-rental">
                    Rental Sekarang
                    <img src="./assets/images/icons/arrow-right.svg" alt="Arrow Right">
                </button>
            </div>
        `;
        carsGrid.appendChild(carCard);
    });

    // testimonial data
    const testimonials = [
        {
            name: 'Alya Putri',
            image: './assets/images/avatar/avatar-1.png',
            rating: 5,
            review: 'Pengalaman pertama sewa mobil di car prime sangat memuaskan! Proses pemesanan sangat mudah dan cepat, serta pilihan mobilnya banyak. Mobil yang saya sewa dalam kondisi prima dan pengemudi sangat profesional.',
            from: 'Jakarta Selatan'
        },
        {
            name: 'Anang Syah Amirul Haqim',
            image: './assets/images/avatar/avatar-2.png',
            rating: 4.9,
            review: 'Saya menggunakan car prime untuk perjalanan bisnis dan sangat senang dengan layanan yang diberikan. Mobilnya bersih dan nyaman, tetapi saya berharap harga sewa sedikit lebih terjangkau untuk jangka waktu panjang.',
            from: 'Jepara'
        },
        {
            name: 'Nadia Aulia',
            image: './assets/images/avatar/avatar-3.png',
            rating: 5,
            review: 'Car prime benar-benar memudahkan perjalanan saya! Proses pemesanannya sangat praktis dan mobil yang disediakan sesuai dengan yang diiklankan. Hanya saja, pengantaran mobil sedikit terlambat, namun tetap memuaskan.',
            from: 'Tangerang Selatan'
        },
    ];

    //mapping testimonial data
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.classList.add('car-card');
        const starsHTML = generateStars(testimonial.rating);
        testimonialCard.innerHTML = `
            <div class="testimonial-card">
                <div class="testimonial-rating">${testimonial.rating.toFixed(1)}</div>
                <div class="stars">${starsHTML}</div>
                <p>${testimonial.review}</p>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="Charlie Johnson">
                    <div>
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.from}</p>
                    </div>
                </div>
            </div>
        `;
        testimonialsGrid.appendChild(testimonialCard);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover effects
    const cards = document.querySelectorAll('.car-card, .step-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Form validation
    const searchInputs = document.querySelectorAll('.search-input input');
    searchInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.borderColor = '#FFB800';
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.borderColor = '#E5E5E5';
        });
    });
});