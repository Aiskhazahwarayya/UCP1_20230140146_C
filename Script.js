function submitForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('registrationForm');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const interests = document.querySelectorAll('input[name="interest"]:checked');
    
    clearErrors();
    
    let isValid = true;
    
    if (!name.value.trim()) {
        showError(name, 'Nama lengkap wajib diisi');
        isValid = false;
    }
    
    if (!email.value.trim()) {
        showError(email, 'Email wajib diisi');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Email tidak valid');
        isValid = false;
    }
    
    if (interests.length === 0) {
        const interestGroup = document.querySelector('.interest-options').parentElement;
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = 'Pilih minimal satu minat belajar';
        interestGroup.appendChild(errorElement);
        isValid = false;
    }
    
    if (isValid) {
        alert('Pesan Anda terkirim! Kami akan segera menghubungi Anda.');
        form.reset();
    }
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
    input.style.borderColor = 'red';
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
    
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.style.borderColor = '';
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showDiscountPopup() {
    const popup = document.getElementById('discountPopup');
    if (!popup) return;
    
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 10000);
}

function closePopup() {
    const popup = document.getElementById('discountPopup');
    if (popup) popup.style.display = 'none';
}

function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

function animateOnLoad() {
    document.querySelectorAll('.animate-on-load').forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * index);
    });
}

function stickyNav() {
    const header = document.querySelector('header');
    if (!header) return;
    
    if (window.pageYOffset > header.offsetTop) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

function lazyLoadVideos() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.src = video.getAttribute('data-src');
                video.removeAttribute('data-src');
                observer.unobserve(video);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('video[data-src]').forEach(video => {
        observer.observe(video);
    });
}

function setupButtonHoverEffects() {
    document.querySelectorAll('.cta-button, .nav-links a').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

function showPromoAlert() {
    const promoMessages = [
        "Dapatkan diskon 20% untuk pendaftaran pertama!",
        "Kelas baru mulai setiap minggu - daftar sekarang!",
        "Gratis konsultasi belajar dengan mentor kami!"
    ];
    const randomMessage = promoMessages[Math.floor(Math.random() * promoMessages.length)];
    alert(randomMessage);
}

function showCurrentDateTime() {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const now = new Date();

    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ` +
    `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;
}

window.onload = function() {
    document.getElementById('datetime').innerText = showCurrentDateTime();
};


document.addEventListener('DOMContentLoaded', function() {

    animateOnLoad();
    setupButtonHoverEffects();
    
    window.addEventListener('scroll', stickyNav);
    
    lazyLoadVideos();
    
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', submitForm);
    }
    
    const footerDate = document.getElementById('footer-date');
    if (footerDate) {
        footerDate.textContent = showCurrentDateTime();
    }
    
});