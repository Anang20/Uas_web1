document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    document.querySelector('.navbar').appendChild(mobileMenuBtn);

    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
    });

    // slider brand
    const brandSliderTrack = document.querySelector('.brands-slider-track');
    const images = Array.from(brandSliderTrack.children);

    // Gandakan elemen untuk seamless effect
    images.forEach((img) => {
        const clone = img.cloneNode(true);
        brandSliderTrack.appendChild(clone);
    });

    let position = 0; // Posisi awal slider
    const speed = 2; // Kecepatan pergeseran (px per frame)

    function animateSlider() {
        position -= speed;

        // Jika slider telah melewati elemen pertama, reset posisi ke awal
        if (Math.abs(position) >= images[0].offsetWidth + 50) {
            position = 0;
        }

        brandSliderTrack.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animateSlider);
    }

    animateSlider();

    // Car data
    const cars = [
        {
            name: 'Honda CR-V',
            image: './assets/images/cars/cr-v.png',
            rating: 5,
            reviews: 145,
            passengers: 4,
            transmission: 'Auto',
            price: 1100000
        },
        {
            name: 'Daihatsu Terios',
            image: './assets/images/cars/daihatsu-terios.png',
            rating: 5,
            reviews: 135,
            passengers: 4,
            transmission: 'Auto',
            price: 900000
        },
        {
            name: 'Suzuki Ertiga',
            image: './assets/images/cars/ertiga.png',
            rating: 4.9,
            reviews: 125,
            passengers: 4,
            transmission: 'Auto',
            price: 850000
        },
        {
            name: 'Honda Brio',
            image: './assets/images/cars/brio.png',
            rating: 4,
            reviews: 125,
            passengers: 4,
            transmission: 'Auto',
            price: 700000
        },
        {
            name: 'Toyota Innova 2.0',
            image: './assets/images/cars/innova-2.0.png',
            rating: 4.5,
            reviews: 155,
            passengers: 2,
            transmission: 'Auto',
            price: 750000
        },
        {
            name: 'Toyota Innova 2.5',
            image: './assets/images/cars/innova-2.5.png',
            rating: 4.8,
            reviews: 155,
            passengers: 2,
            transmission: 'Auto',
            price: 750000
        },
        {
            name: 'Toyota Rush',
            image: './assets/images/cars/rush.png',
            rating: 5.0,
            reviews: 155,
            passengers: 2,
            transmission: 'Auto',
            price: 1000000
        },
        {
            name: 'Toyota Avanza',
            image: './assets/images/cars/toyota-avanza.png',
            rating: 4.9,
            reviews: 155,
            passengers: 2,
            transmission: 'Auto',
            price: 950000
        },
    ];

    // Populate car cards
    const carsGrid = document.querySelector('.cars-grid');
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.classList.add('car-card');
        carCard.innerHTML = `
            <div class="wrap-cars-image">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="car-details">
                <div class="car-header">
                    <h3>${car.name}</h3>
                    <div class="rating">
                        <span>${car.rating}</span>
                        <div class="stars">★★★★★</div>
                        <span>(${car.reviews} reviews)</span>
                    </div>
                </div>
                <div class="car-specs">
                    <span>${car.passengers} Passengers</span>
                    <span>${car.transmission}</span>
                </div>
                <div class="car-price">
                    <div>
                        <span class="price">Rp ${Intl.NumberFormat('id-ID').format(car.price)}</span>
                        <span class="day">/hari</span>
                    </div>
                    <button class="btn-primary">Rental</button>
                </div>
            </div>
        `;
        carsGrid.appendChild(carCard);
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