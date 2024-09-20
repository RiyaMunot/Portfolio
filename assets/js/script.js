document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            document.querySelector('.navbar').style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        }
    });

    // Form validation and submission
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        let isValid = true;
        
        // Validate Name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        }
        
        // Validate Email
        const email = document.getElementById('email');
        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Message
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            showError(message, 'Message is required');
            isValid = false;
        }
        
        if (isValid) {
            // If the form is valid, show loading indicator and submit the form
            showLoading();
            this.submit();
        }
    });

    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger mt-1';
        errorDiv.innerText = message;
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showLoading() {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    }

    // Handle form submission response
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'success') {
        showAlert('Thank you for your message! I will get back to you soon.', 'success');
    } else if (status === 'error') {
        showAlert('Oops! There was a problem sending your message. Please try again later.', 'danger');
    }

    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        form.parentNode.insertBefore(alertDiv, form);

        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    // Add animation to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.5s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });

    skillCards.forEach(card => {
        observer.observe(card);
    });
});