document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const rocket = document.querySelector('.rocket');
    const clouds = document.querySelector('.clouds');
    const moon = document.querySelector('.moon');
    const stars = document.querySelector('.stars');
    const launchBtn = document.getElementById('launchBtn');
    const resetBtn = document.getElementById('resetBtn');

    function createStars() {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            stars.appendChild(star);
        }
    }

    function showStars() {
        document.querySelectorAll('.star').forEach(star => {
            star.style.opacity = 1;
        });
    }

    function hideStars() {
        document.querySelectorAll('.star').forEach(star => {
            star.style.opacity = 0;
        });
    }

    function launchRocket() {
        rocket.style.transform = 'translateY(-2000px)';
        clouds.style.opacity = 0;
        moon.style.transform = 'scale(3) translate(50px, 100px)';
        showStars();
        
        document.querySelectorAll('.main-thrust, .left-thrust, .right-thrust').forEach(thrust => {
            thrust.style.opacity = 1;
        });

        container.style.background = 'linear-gradient(to bottom, #000, #000)';
    }

    function resetAnimation() {
        rocket.style.transform = 'translateY(0)';
        clouds.style.opacity = 1;
        moon.style.transform = 'scale(1) translate(0, 0)';
        hideStars();
        
        document.querySelectorAll('.main-thrust, .left-thrust, .right-thrust').forEach(thrust => {
            thrust.style.opacity = 0;
        });

        container.style.background = 'linear-gradient(to bottom, #87CEEB, #000)';
    }

    createStars();
    
    launchBtn.addEventListener('click', launchRocket);
    resetBtn.addEventListener('click', resetAnimation);
});