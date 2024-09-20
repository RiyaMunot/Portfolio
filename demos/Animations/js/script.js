document.querySelectorAll('.transform-box').forEach(box => {
    box.addEventListener('click', function() {
        this.classList.add('active');
        setTimeout(() => {
            this.classList.remove('active');
        }, 1500);
    });
});