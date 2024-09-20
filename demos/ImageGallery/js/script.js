const gallery = document.getElementById('gallery');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        const modalImage = document.getElementById('modalImage');
        const zoomRange = document.getElementById('zoomRange');
        const rotateBtn = document.getElementById('rotateBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        const currentImageInfo = document.getElementById('currentImageInfo');
        const progressBar = document.querySelector('.progress-bar');

        const images = [
            './images/1.jpg', './images/2.jpg', './images/3.jpg', './images/4.jpg', './images/5.jpg',
            './images/6.jpg', './images/7.jpg', './images/8.jpg', './images/9.jpg', './images/10.jpg'
        ];

        let currentRotation = 0;
        let currentImageIndex = 0;
        let isPlaying = true;
        let rotationAngle = 0;

        function createGallery() {
            images.forEach((src, index) => {
                const span = document.createElement('span');
                span.style.setProperty('--i', index);
                span.style.transform = `rotateY(${index * 36}deg) translateZ(300px)`;
                const img = document.createElement('img');
                img.src = src;
                img.alt = `Image ${index + 1}`;
                img.addEventListener('click', () => openModal(src, index));
                span.appendChild(img);
                gallery.appendChild(span);
            });
            updateImageInfo();
        }

        function rotateGallery(direction) {
            currentRotation += direction * 36;
            gallery.style.transform = `rotateY(${currentRotation}deg)`;
            currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
            updateImageInfo();
        }

        function openModal(src, index) {
            modalImage.src = src;
            currentImageIndex = index;
            zoomRange.value = 1;
            rotationAngle = 0;
            modalImage.style.transform = `scale(1) rotate(0deg)`;
            imageModal.show();
            updateImageInfo();
        }

        function updateImageInfo() {
            currentImageInfo.textContent = `Image ${currentImageIndex + 1} of ${images.length}`;
            progressBar.style.width = `${((currentImageIndex + 1) / images.length) * 100}%`;
            progressBar.setAttribute('aria-valuenow', ((currentImageIndex + 1) / images.length) * 100);
        }

        prevBtn.addEventListener('click', () => rotateGallery(-1));
        nextBtn.addEventListener('click', () => rotateGallery(1));

        playPauseBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playPauseBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i> Pause' : '<i class="fas fa-play"></i> Play';
            if (isPlaying) {
                autoRotate();
            }
        });

        zoomRange.addEventListener('input', (e) => {
            modalImage.style.transform = `scale(${e.target.value}) rotate(${rotationAngle}deg)`;
        });

        rotateBtn.addEventListener('click', () => {
            rotationAngle = (rotationAngle + 90) % 360;
            modalImage.style.transform = `scale(${zoomRange.value}) rotate(${rotationAngle}deg)`;
        });

        downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = modalImage.src;
            link.download = `image-${currentImageIndex + 1}.jpg`;
            link.click();
        });

        function autoRotate() {
            if (isPlaying) {
                rotateGallery(1);
                setTimeout(autoRotate, 3000);
            }
        }

        createGallery();
        autoRotate();